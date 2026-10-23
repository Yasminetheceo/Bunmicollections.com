import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function ensureGid(id: string, type: string): string {
  if (id.startsWith("gid://")) return id;
  return `gid://shopify/${type}/${id}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const shopifyDomain = Deno.env.get("ShopifyDomain");
    const storefrontAccessToken = Deno.env.get("StorefrontAccessToken");

    if (!shopifyDomain || !storefrontAccessToken) {
      return new Response(JSON.stringify({ error: "Shopify credentials not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lines = items.map((item: { variantId: string; quantity: number }) => ({
      merchandiseId: ensureGid(item.variantId, "ProductVariant"),
      quantity: item.quantity,
    }));

    console.log("Cart lines being sent to Shopify:", JSON.stringify(lines));

    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;

    const response = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: { lines } },
      }),
    });

    const data = await response.json();
    console.log("Shopify cartCreate response:", JSON.stringify(data));

    if (data.errors) {
      return new Response(JSON.stringify({ error: JSON.stringify(data.errors) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userErrors = data.data?.cartCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      return new Response(JSON.stringify({ error: userErrors[0].message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let checkoutUrl: string = data.data?.cartCreate?.cart?.checkoutUrl;
    console.log("Raw checkoutUrl from Shopify:", checkoutUrl);

    if (!checkoutUrl) {
      return new Response(JSON.stringify({ error: "No checkout URL returned", debug: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Always force the domain to the myshopify.com store domain.
    // This is required because the custom domain DNS points to Readdy AI,
    // so using the custom domain in the checkout URL causes a 404.
    // Shopify's checkout works correctly on the myshopify.com domain directly.
    try {
      const parsed = new URL(checkoutUrl);
      parsed.hostname = shopifyDomain;
      checkoutUrl = parsed.toString();
    } catch (_) {
      // If URL parsing fails, fall back to the raw URL
    }

    console.log("Final checkoutUrl:", checkoutUrl);

    return new Response(JSON.stringify({ checkoutUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
