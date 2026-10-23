import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function detectTexture(tags: string[], title: string, productType: string): string {
  const haystack = [...tags, title, productType].join(' ').toLowerCase();
  if (haystack.includes('wavy') || haystack.includes('wave')) return 'Wavy';
  if (haystack.includes('straight')) return 'Straight';
  if (haystack.includes('curly') || haystack.includes('curl') || haystack.includes('kinky')) return 'Curly';
  return '';
}

function detectCategory(title: string, productType: string, tags: string[]): string {
  const haystack = [title, productType, ...tags].join(' ').toLowerCase();
  if (haystack.includes('lace')) return 'Lace';
  if (haystack.includes('extension')) return 'Extensions';
  return 'Extensions';
}

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
      query GetAllProducts {
        products(first: 50, sortKey: BEST_SELLING) {
          edges {
            node {
              id
              title
              handle
              productType
              tags
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
                    selectedOptions {
                      name
                      value
                    }
                  }
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
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const products = (data.data?.products?.edges ?? []).map(({ node: p }: any) => {
      const lengthOption = p.variants.edges[0]?.node.selectedOptions?.find(
        (o: any) => o.name.toLowerCase() === "length"
      );
      const texture = detectTexture(p.tags ?? [], p.title, p.productType ?? '');
      const category = detectCategory(p.title, p.productType ?? '', p.tags ?? []);
      return {
        id: p.id,
        name: p.title,
        handle: p.handle,
        category,
        texture,
        length: lengthOption?.value ?? "",
        price: parseFloat(p.priceRange.minVariantPrice.amount),
        currencyCode: p.priceRange.minVariantPrice.currencyCode,
        tag: p.tags?.[0] ?? null,
        image: p.images.edges[0]?.node.url ?? "",
        imageAlt: p.images.edges[0]?.node.altText ?? p.title,
        variantId: p.variants.edges[0]?.node.id ?? "",
        availableForSale: p.variants.edges[0]?.node.availableForSale ?? false,
      };
    });

    // Sort: Extensions first, then Lace
    const categoryOrder: Record<string, number> = { Extensions: 0, Lace: 1 };
    products.sort((a: any, b: any) => {
      const aOrder = categoryOrder[a.category] ?? 99;
      const bOrder = categoryOrder[b.category] ?? 99;
      return aOrder - bOrder;
    });

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
