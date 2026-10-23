import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEATURED_PRODUCT_IDS = [
  "gid://shopify/Product/8498789056704",
  "gid://shopify/Product/8501316288704",
  "gid://shopify/Product/8501316321472",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const shopifyDomain = Deno.env.get("ShopifyDomain");
    const storefrontAccessToken = Deno.env.get("StorefrontAccessToken");

    if (!shopifyDomain || !storefrontAccessToken) {
      return new Response(
        JSON.stringify({
          error: "Shopify credentials not configured",
          shopifyDomain: !!shopifyDomain,
          token: !!storefrontAccessToken,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const query = `
      query GetProductsByIds($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Product {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(
      `https://${shopifyDomain}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables: { ids: FEATURED_PRODUCT_IDS } }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const products = (data.data?.nodes ?? [])
      .filter((node: any) => node && node.id)
      .map((p: any) => ({
        id: p.id,
        name: p.title,
        handle: p.handle,
        price: parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2),
        currencyCode: p.priceRange.minVariantPrice.currencyCode,
        image: p.images.edges[0]?.node.url ?? "",
        imageAlt: p.images.edges[0]?.node.altText ?? p.title,
        variantId: p.variants.edges[0]?.node.id ?? "",
        availableForSale: p.variants.edges[0]?.node.availableForSale ?? false,
      }));

    return new Response(JSON.stringify({ products }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
