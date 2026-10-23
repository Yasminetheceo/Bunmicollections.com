import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ShopifyProduct {
  id: string;
  name: string;
  handle: string;
  category: string;
  texture: string;
  length: string;
  price: number;
  currencyCode: string;
  tag: string | null;
  image: string;
  imageAlt: string;
  variantId: string;
  availableForSale: boolean;
}

const normalizeTexture = (tex: string): string => {
  const t = (tex || '').toLowerCase();
  if (t.includes('wave') || t.includes('wavy')) return 'Wavy';
  if (t.includes('straight')) return 'Straight';
  if (t.includes('curl') || t.includes('kinky')) return 'Curly';
  return tex;
};

interface ShopGridProps {
  activeFilter: string;
  activeTexture: string;
  sortBy: string;
  onProductsLoaded?: (products: ShopifyProduct[]) => void;
}

const ShopGrid = ({ activeFilter, activeTexture, sortBy, onProductsLoaded }: ShopGridProps) => {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://evrirvmydyritseahgmk.supabase.co/functions/v1/shop-products')
      .then((res) => res.json())
      .then((data) => {
        const rawProducts: ShopifyProduct[] = data.products ?? [];
        const products = rawProducts.map((p) => ({ ...p, texture: normalizeTexture(p.texture) }));
        setAllProducts(products);
        onProductsLoaded?.(products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  let filtered = allProducts.filter((p) => {
    const matchCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchTexture = activeTexture === 'All' || p.texture === activeTexture;
    return matchCategory && matchTexture;
  });

  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered = [...filtered].reverse();
  }

  if (loading) {
    return (
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F0EBE3] rounded-2xl mb-4" style={{ aspectRatio: '4/5' }} />
                <div className="h-4 bg-[#E8E0D8] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#E8E0D8] rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <i className="ri-shopping-bag-line text-5xl text-gray-300 mb-4 block"></i>
            <p className="font-['Inter'] text-gray-400 text-sm">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8" data-product-shop>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopGrid;
