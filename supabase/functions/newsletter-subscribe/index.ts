import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AIRTABLE_BASE_ID = "appsb0rCsCPzL8iP2";
const AIRTABLE_TABLE = "Email Newsletter List";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const airtableToken = Deno.env.get("AIRTABLE_TOKEN");

    if (!airtableToken) {
      return new Response(
        JSON.stringify({ error: "Airtable token not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return new Response(
        JSON.stringify({ error: "A valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tablePath = encodeURIComponent(AIRTABLE_TABLE);
    const authHeaders = {
      Authorization: `Bearer ${airtableToken}`,
      "Content-Type": "application/json",
    };

    const formula = encodeURIComponent(`LOWER({Email})="${email}"`);
    const lookupRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath}?maxRecords=1&filterByFormula=${formula}`,
      { headers: authHeaders }
    );

    if (lookupRes.ok) {
      const lookup = await lookupRes.json();
      if (Array.isArray(lookup?.records) && lookup.records.length > 0) {
        return new Response(
          JSON.stringify({ success: true, alreadySubscribed: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const createRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath}`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ fields: { Email: email }, typecast: true }),
      }
    );

    if (!createRes.ok) {
      const detail = await createRes.text();
      return new Response(
        JSON.stringify({ error: "Failed to save subscriber", detail }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
