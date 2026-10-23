import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShopifyProduct {
  id: string;
  name: string;
  handle: string;
  price: string;
  currencyCode: string;
  image: string;
  imageAlt: string;
  variantId: string;
  availableForSale: boolean;
}

const FEATURED_TITLES = [
  'BUNMI Raw Straight',
  'BUNMI Kinky Curly',
  'BUNMI Kinky Straight',
  'BUNMI Wave',
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://evrirvmydyritseahgmk.supabase.co/functions/v1/shop-products')
      .then((res) => res.json())
      .then((data) => {
        const allProducts: ShopifyProduct[] = data.products ?? [];
        const featured = FEATURED_TITLES
          .map((title) => allProducts.find((p) => p.name === title))
          .filter(Boolean) as ShopifyProduct[];
        setProducts(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleShopNow = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const numericId = product.id.split('/').pop();
    navigate(`/shop/${numericId}`);
  };

  const renderButton = (product: ShopifyProduct) => (
    <button
      onClick={(e) => handleShopNow(e, product)}
      className={`w-full py-4 text-xs font-['Inter'] font-semibold tracking-widest uppercase transition-colors whitespace-nowrap cursor-pointer ${
        !product.availableForSale
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-[#631D26] text-white hover:bg-[#4A2323]'
      }`}
      disabled={!product.availableForSale}
    >
      {!product.availableForSale ? 'Sold Out' : 'Shop Now'}
    </button>
  );

  return (
    <section id="bunmi-collection" className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-[#631D26] text-xs font-['Inter'] font-semibold tracking-[0.2em] uppercase mb-3">
              Bestsellers
            </p>
            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-[#1a1a1a]">
              The Bunmi Collection
            </h2>
          </div>
          <a
            href="/shop"
            className="mt-6 sm:mt-0 inline-flex items-center text-sm font-['Inter'] font-medium text-[#631D26] border-b border-[#631D26] pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer"
          >
            View All
            <i className="ri-arrow-right-line ml-1.5"></i>
          </a>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" data-product-shop>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-2xl bg-[#F0EBE3] h-[420px] sm:h-[500px] mb-5" />
                <div className="flex items-center justify-between px-1">
                  <div className="h-5 bg-[#E8E0D8] rounded w-2/3" />
                  <div className="h-5 bg-[#E8E0D8] rounded w-1/5" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? null : products.length === 1 ? (
          <div className="max-w-sm" data-product-shop>
            {products.map((product) => {
              const numericId = product.id.split('/').pop();
              return (
                <a key={product.id} href={`/shop/${numericId}`} className="group cursor-pointer block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#F0EBE3] h-[500px] mb-5">
                    <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {renderButton(product)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-['Bebas_Neue'] text-lg text-[#1a1a1a]">{product.name}</h3>
                    <span className="font-['Inter'] text-base font-medium text-[#631D26]">{product.currencyCode === 'USD' ? '$' : product.currencyCode}{product.price}</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : products.length === 2 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8" data-product-shop>
            {products.map((product) => {
              const numericId = product.id.split('/').pop();
              return (
                <a key={product.id} href={`/shop/${numericId}`} className="group cursor-pointer block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#F0EBE3] h-[420px] sm:h-[500px] mb-5">
                    <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {renderButton(product)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-['Bebas_Neue'] text-lg text-[#1a1a1a]">{product.name}</h3>
                    <span className="font-['Inter'] text-base font-medium text-[#631D26]">{product.currencyCode === 'USD' ? '$' : product.currencyCode}{product.price}</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${products.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 sm:gap-8`}
            data-product-shop
          >
            {products.map((product) => {
              const numericId = product.id.split('/').pop();
              return (
                <a
                  key={product.id}
                  href={`/shop/${numericId}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-[#F0EBE3] mb-5" style={{ height: '480px' }}>
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {renderButton(product)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-['Bebas_Neue'] text-lg text-[#1a1a1a]">{product.name}</h3>
                    <span className="font-['Inter'] text-base font-medium text-[#631D26]">
                      {product.currencyCode === 'USD' ? '$' : product.currencyCode}{product.price}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;