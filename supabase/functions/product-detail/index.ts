import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const numericId = url.searchParams.get("id");

    if (!numericId) {
      return new Response(JSON.stringify({ error: "Missing product id" }), {
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

    const gid = `gid://shopify/Product/${numericId}`;

    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          handle
          descriptionHtml
          productType
          tags
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          media(first: 20) {
            edges {
              node {
                mediaContentType
                alt
                ... on MediaImage {
                  image {
                    url
                    width
                    height
                  }
                }
                ... on Video {
                  sources {
                    url
                    mimeType
                    format
                    height
                    width
                  }
                  previewImage {
                    url
                  }
                }
                ... on ExternalVideo {
                  embeddedUrl
                  previewImage {
                    url
                  }
                }
                ... on Model3d {
                  previewImage {
                    url
                  }
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
              }
            }
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
      body: JSON.stringify({ query, variables: { id: gid } }),
    });

    const data = await response.json();

    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const p = data.data?.product;

    if (!p) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const media = p.media.edges.map(({ node }: any) => {
      const type = node.mediaContentType;

      if (type === "IMAGE") {
        return {
          type: "image",
          url: node.image?.url ?? "",
          altText: node.alt ?? p.title,
          width: node.image?.width ?? 0,
          height: node.image?.height ?? 0,
          previewUrl: node.image?.url ?? "",
        };
      }

      if (type === "VIDEO") {
        const sources: any[] = node.sources ?? [];

        // Priority: mp4 first (most browser-compatible), then any other
        const mp4Sources = sources.filter((s: any) => s.mimeType === "video/mp4");
        const otherSources = sources.filter((s: any) => s.mimeType !== "video/mp4");

        // Pick highest resolution mp4 available
        const bestMp4 = mp4Sources.sort((a: any, b: any) => (b.height ?? 0) - (a.height ?? 0))[0];
        const fallback = otherSources[0];
        const chosen = bestMp4 ?? fallback;

        // Return all mp4 sources so frontend can try multiple
        const allMp4Urls = mp4Sources
          .sort((a: any, b: any) => (b.height ?? 0) - (a.height ?? 0))
          .map((s: any) => ({ url: s.url, mimeType: s.mimeType }));

        return {
          type: "video",
          url: chosen?.url ?? "",
          mimeType: chosen?.mimeType ?? "video/mp4",
          altText: node.alt ?? p.title,
          previewUrl: node.previewImage?.url ?? "",
          width: chosen?.width ?? 0,
          height: chosen?.height ?? 0,
          sources: allMp4Urls.length > 0 ? allMp4Urls : (chosen ? [{ url: chosen.url, mimeType: chosen.mimeType }] : []),
        };
      }

      if (type === "EXTERNAL_VIDEO") {
        return {
          type: "external_video",
          url: node.embeddedUrl ?? "",
          altText: node.alt ?? p.title,
          previewUrl: node.previewImage?.url ?? "",
        };
      }

      return {
        type: "image",
        url: node.previewImage?.url ?? "",
        altText: node.alt ?? p.title,
        previewUrl: node.previewImage?.url ?? "",
        width: 0,
        height: 0,
      };
    }).filter((m: any) => m.url);

    const images = media
      .filter((m: any) => m.type === "image")
      .map((m: any) => ({
        url: m.url,
        altText: m.altText,
        width: m.width,
        height: m.height,
      }));

    const options = p.options.map((opt: any) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values,
    }));

    const variants = p.variants.edges.map(({ node: v }: any) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      quantityAvailable: v.quantityAvailable ?? 0,
      price: parseFloat(v.price.amount).toFixed(2),
      currencyCode: v.price.currencyCode,
      compareAtPrice: v.compareAtPrice
        ? parseFloat(v.compareAtPrice.amount).toFixed(2)
        : null,
      selectedOptions: v.selectedOptions,
      image: v.image ? { url: v.image.url, altText: v.image.altText ?? p.title } : null,
    }));

    const product = {
      id: p.id,
      numericId,
      title: p.title,
      handle: p.handle,
      descriptionHtml: p.descriptionHtml,
      productType: p.productType,
      tags: p.tags,
      vendor: p.vendor,
      minPrice: parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2),
      maxPrice: parseFloat(p.priceRange.maxVariantPrice.amount).toFixed(2),
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
      images,
      media,
      options,
      variants,
    };

    return new Response(JSON.stringify({ product }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
