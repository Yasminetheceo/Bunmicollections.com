import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductDescription from './components/ProductDescription';
import HairDetails from './components/HairDetails';
import ModelLine from './components/ModelLine';

interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface MediaItem {
  type: 'image' | 'video' | 'external_video';
  url: string;
  altText: string;
  previewUrl: string;
  mimeType?: string;
  width?: number;
  height?: number;
}

interface Option {
  id: string;
  name: string;
  values: string[];
}

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: string;
  currencyCode: string;
  compareAtPrice: string | null;
  selectedOptions: { name: string; value: string }[];
  image: { url: string; altText: string } | null;
}

interface Product {
  id: string;
  numericId: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  minPrice: string;
  maxPrice: string;
  currencyCode: string;
  images: ProductImage[];
  media: MediaItem[];
  options: Option[];
  variants: Variant[];
}

const ProductDetailSkeleton = () => (
  <div className="flex min-h-screen animate-pulse">
    {/* Left image column */}
    <div className="flex-1 flex flex-col gap-2 p-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full bg-[#F0EBE3]" style={{ aspectRatio: '3/4' }} />
      ))}
    </div>
    {/* Right info column */}
    <div className="w-80 flex-shrink-0 flex flex-col items-center gap-4 p-10 pt-32">
      <div className="h-3 bg-[#F0EBE3] rounded w-2/3" />
      <div className="h-3 bg-[#F0EBE3] rounded w-1/3" />
      <div className="h-px w-8 bg-[#F0EBE3]" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => <div key={i} className="w-7 h-7 rounded-full bg-[#F0EBE3]" />)}
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => <div key={i} className="w-9 h-9 rounded-full bg-[#F0EBE3]" />)}
      </div>
      <div className="h-10 w-48 bg-[#F0EBE3] rounded" />
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetch(
      `https://evrirvmydyritseahgmk.supabase.co/functions/v1/product-detail?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError('Product not found.');
        } else {
          setProduct(data.product);
          // Set default variant (first one)
          if (data.product?.variants?.length > 0) {
            setSelectedVariant(data.product.variants[0]);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product. Please try again.');
        setLoading(false);
      });
  }, [id]);

  // Determine price label based on selected variant
  const priceLabel = (() => {
    if (!selectedVariant) return '';
    const vTitle = selectedVariant.title.toLowerCase();
    if (vTitle.includes('bundle set') || vTitle.includes('3 pc')) return 'per set';
    if (vTitle.includes('closure set')) return 'per closure set';
    if (vTitle.includes('frontal set')) return 'per frontal set';
    if (vTitle.includes('closure')) return 'per closure';
    if (vTitle.includes('frontal')) return 'per frontal';
    // Lace products — no set label, just show variant title
    if (product?.title.toLowerCase().includes('lace') || product?.productType?.toLowerCase().includes('lace')) {
      const opts = selectedVariant.selectedOptions.map((o: { value: string }) => o.value).join(' — ');
      return opts || '';
    }
    return 'per bundle';
  })();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20" />

      {loading && <ProductDetailSkeleton />}

      {error && (
        <div className="flex flex-col items-center justify-center py-40 px-8 text-center">
          <p className="font-['Inter'] text-sm tracking-widest uppercase text-gray-400 mb-6">{error}</p>
          <Link
            to="/shop"
            className="font-['Inter'] text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap"
          >
            Back to Shop
          </Link>
        </div>
      )}

      {!loading && !error && product && (
        <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 80px)' }}>

          {/* LEFT — image gallery, full width on mobile, 55% on desktop */}
          <div className="w-full lg:w-[55%] border-b lg:border-b-0 lg:border-r border-[#EEEBE7] lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:overflow-y-auto">
            <ImageGallery
              images={product.images}
              media={product.media?.length ? product.media : product.images.map(img => ({ type: 'image' as const, url: img.url, altText: img.altText, previewUrl: img.url }))}
              title={product.title}
            />
            {/* Model Line — sits right under the gallery */}
            {!product.title.toLowerCase().includes('lace') && (
              <div className="py-6 lg:py-8">
                <ModelLine
                  title={product.title}
                  tags={product.tags}
                  descriptionHtml={product.descriptionHtml}
                />
              </div>
            )}
          </div>

          {/* RIGHT — product info + description, full width on mobile, 45% on desktop */}
          <div className="w-full lg:w-[45%] flex flex-col overflow-y-auto">
            <div className="flex flex-col px-5 sm:px-8 lg:px-10 pt-8 lg:pt-14 pb-10 gap-6 lg:gap-8">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <Link to="/shop" className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-gray-300 hover:text-[#1a1a1a] transition-colors cursor-pointer whitespace-nowrap">
                  Shop
                </Link>
                <span className="text-gray-200 text-[10px]">/</span>
                <span className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-gray-400 truncate">
                  {product.title}
                </span>
              </div>

              {/* Vendor */}
              <p className="font-['Inter'] text-[9px] tracking-[0.35em] uppercase text-gray-300">
                {product.vendor || 'Bunmi Collection'}
              </p>

              {/* Title */}
              <h1 className="font-['Inter'] text-base font-semibold tracking-[0.2em] uppercase text-[#1a1a1a] leading-snug">
                {product.title}
              </h1>

              {/* Price — updates when variant changes */}
              <div className="flex items-baseline gap-2">
                {(() => {
                  const sym = product.currencyCode === 'GBP' ? '£' : product.currencyCode === 'EUR' ? '€' : '$';
                  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(product.minPrice);
                  const compareAt = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice) : null;
                  return (
                    <>
                      <span className="font-['Inter'] text-sm text-[#1a1a1a] tracking-wide">
                        {sym}{price.toFixed(2)}
                      </span>
                      {compareAt && compareAt > price && (
                        <span className="font-['Inter'] text-xs text-gray-400 line-through">
                          {sym}{compareAt.toFixed(2)}
                        </span>
                      )}
                      <span className="font-['Inter'] text-[10px] text-gray-400 tracking-wide">
                        {priceLabel}
                      </span>
                    </>
                  );
                })()}
              </div>

              {/* Thin divider */}
              <div className="w-10 h-px bg-[#D8D2CB]" />

              {/* Product Info (variants + add to bag) */}
              <ProductInfo
                product={product}
                onVariantChange={setSelectedVariant}
              />

              {/* Thin divider */}
              <div className="w-full h-px bg-[#EEEBE7]" />

              {/* Hair Details */}
              <HairDetails
                productType={product.productType}
                tags={product.tags}
                title={product.title}
                descriptionHtml={product.descriptionHtml}
              />

              {/* Thin divider */}
              <div className="w-full h-px bg-[#EEEBE7]" />

              {/* Description accordions */}
              <ProductDescription
                descriptionHtml={product.descriptionHtml}
                productType={product.productType}
                tags={product.tags}
              />

              {/* Back to shop */}
              <div className="pt-4">
                <Link
                  to="/shop"
                  className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-gray-300 hover:text-[#1a1a1a] transition-colors cursor-pointer whitespace-nowrap"
                >
                  ← Back to Shop
                </Link>
              </div>

            </div>
          </div>

        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetailPage;