import { useState, useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';
import ProductTypeTabs from './ProductTypeTabs';
import VariantSelector from './VariantSelector';

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
  image?: { url: string; altText: string } | null;
}

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  minPrice: string;
  maxPrice: string;
  currencyCode: string;
  options: Option[];
  variants: Variant[];
  images?: { url: string; altText: string }[];
}

interface ProductInfoProps {
  product: Product;
  onVariantChange?: (variant: Variant) => void;
}

const currencySymbol = (code: string) => {
  if (code === 'GBP') return '£';
  if (code === 'EUR') return '€';
  return '$';
};

const ProductInfo = ({ product, onVariantChange }: ProductInfoProps) => {
  const { addToCart, openCart } = useCart();
  
  const defaultOptions: Record<string, string> = {};
  product.options.forEach((opt) => {
    if (opt.values.length > 0) defaultOptions[opt.name] = opt.values[0];
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultOptions);
  const [addedToBag, setAddedToBag] = useState(false);

  const selectedVariant = product.variants.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
  ) ?? product.variants[0];

  // Notify parent whenever the resolved variant changes
  useEffect(() => {
    if (selectedVariant && onVariantChange) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant?.id]);

  const isAvailable = selectedVariant?.availableForSale ?? false;

  // Detect if product is a lace item — lace products should NOT show set/bundle tabs
  const isLace = product.productType?.toLowerCase().includes('lace') ||
    product.title.toLowerCase().includes('lace') ||
    product.tags?.some((t: string) => t.toLowerCase().includes('lace'));

  // Raw hair products use the BUNMI Raw Straight copy treatment
  const isRaw = /\braw\b/i.test(product.title) ||
    product.tags?.some((t: string) => /\braw\b/i.test(t));

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToBag = () => {
    if (!isAvailable || !selectedVariant) return;
    
    const productImage = selectedVariant.image?.url || product.images?.[0]?.url || 'https://readdy.ai/api/search-image?query=luxury%20hair%20extensions%20bundles%20on%20marble%20surface%20with%20soft%20lighting%20and%20elegant%20presentation%20beauty%20product%20photography&width=400&height=500&seq=fallback-product&orientation=portrait';
    
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.title,
      price: parseFloat(selectedVariant.price),
      currencyCode: selectedVariant.currencyCode,
      image: productImage,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
    
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
    
    // Only open cart drawer on desktop
    if (window.innerWidth >= 768) {
      openCart();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Product Type Tabs — only for non-lace products */}
      {!isLace ? (
        <ProductTypeTabs
          options={product.options}
          variants={product.variants}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
          isRaw={isRaw}
        />
      ) : (
        <VariantSelector
          options={product.options}
          variants={product.variants}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
          skipBundleDetection
        />
      )}

      {/* Stock warning */}
      {isAvailable && (selectedVariant?.quantityAvailable ?? 99) <= 5 && (selectedVariant?.quantityAvailable ?? 99) > 0 && (
        <p className="font-['Inter'] text-[11px] text-amber-600 tracking-wide">
          Only {selectedVariant?.quantityAvailable} left
        </p>
      )}

      {/* Add to Bag */}
      <button
        onClick={handleAddToBag}
        disabled={!isAvailable}
        className={`w-full py-3.5 font-['Inter'] text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer border
          ${isAvailable
            ? addedToBag
              ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
              : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
            : 'bg-transparent text-gray-300 border-gray-200 cursor-not-allowed'
          }`}
      >
        {!isAvailable ? 'Sold Out' : addedToBag ? 'Added ✓' : 'Add to Bag'}
      </button>

      {/* Shipping notice */}
      <div className="flex flex-col gap-1">
        <p className="font-['Inter'] text-[10px] tracking-[0.15em] text-gray-400 leading-relaxed">
          Orders are processed within 3–5 business days. Delivery takes an additional 2–5 days.
        </p>
        <a
          href="/shipping-policy"
          className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-[#631D26] transition-colors cursor-pointer underline underline-offset-2 whitespace-nowrap"
        >
          View Shipping Policy →
        </a>
      </div>
    </div>
  );
};

export default ProductInfo;