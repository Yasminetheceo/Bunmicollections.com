import { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  category: string;
  length: string;
  price: number;
  currencyCode: string;
  tag: string | null;
  image: string;
  imageAlt: string;
  availableForSale: boolean;
}

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = "https://readdy.ai/api/search-image?query=luxury%20hair%20extensions%20bundles%20laid%20flat%20on%20a%20clean%20white%20marble%20surface%2C%20silky%20smooth%20texture%2C%20natural%20black%20and%20brown%20tones%2C%20professional%20beauty%20product%20photography%2C%20soft%20studio%20lighting%2C%20elegant%20and%20minimal%20composition%2C%20high-end%20hair%20care%20brand%20aesthetic&width=400&height=500&seq=hairext-fallback-01&orientation=portrait";

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, openCart } = useCart();
  const numericId = product.id.split('/').pop();
  const imageSrc = product.image || FALLBACK_IMAGE;

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.availableForSale || isAdding) return;

    setIsAdding(true);
    
    addToCart({
      variantId: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      currencyCode: product.currencyCode,
      image: imageSrc,
      quantity: 1,
      selectedOptions: {
        length: product.length || '',
        texture: ''
      }
    });

    // Only open cart drawer on desktop
    if (window.innerWidth >= 768) {
      openCart();
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <a href={`/product/${numericId}`} className="group cursor-pointer block">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#F0EBE3] rounded-2xl mb-4" style={{ aspectRatio: '4/5' }}>
        <img
          src={imageSrc}
          alt={product.imageAlt || product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span className="font-['Inter'] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 bg-white text-[#1a1a1a] rounded-full shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer"
        >
          <i className={`text-sm ${isWishlisted ? 'ri-heart-fill text-[#631D26]' : 'ri-heart-line text-gray-600'}`}></i>
        </button>

        {/* Add to Bag Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToBag}
            disabled={!product.availableForSale}
            className={`w-full py-3.5 font-['Inter'] text-xs font-semibold tracking-widest uppercase transition-colors whitespace-nowrap ${
              !product.availableForSale
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : isAdding
                ? 'bg-green-600 text-white'
                : 'bg-[#631D26] text-white hover:bg-[#4A2323] cursor-pointer'
            }`}
          >
            {!product.availableForSale ? 'Sold Out' : isAdding ? 'Added ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <p className="font-['Inter'] text-[10px] tracking-widest uppercase text-gray-400 mb-1">
          {product.category}{product.length ? ` · ${product.length}` : ''}
        </p>
        <div className="flex items-center justify-between">
          <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#1a1a1a]">
            {product.name}
          </h3>
          <span className="font-['Inter'] text-sm font-medium text-[#631D26]">
            {product.currencyCode === 'USD' ? '$' : product.currencyCode}{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
