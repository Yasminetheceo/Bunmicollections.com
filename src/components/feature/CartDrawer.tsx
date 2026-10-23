import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [chargebackAgreed, setChargebackAgreed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/shopify-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatPrice = (price: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer — full screen on mobile, 440px panel on sm+ */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '100dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-200 flex-shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#631D26]">
            Your Bag
            {cartCount > 0 && (
              <span className="ml-2 text-sm sm:text-base font-normal text-gray-500">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#631D26] transition-colors cursor-pointer -mr-1"
            aria-label="Close cart"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Cart Items or Empty State — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 flex items-center justify-center bg-[#FAF5F0] rounded-full mb-4">
                <i className="ri-shopping-bag-line text-4xl text-[#9B7B6A]"></i>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#631D26] mb-2">
                Your bag is empty
              </h3>
              <p className="font-['Inter'] text-sm text-gray-600 mb-6">
                Add some beautiful hair to get started
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-block bg-[#631D26] text-white font-['Inter'] text-sm font-semibold tracking-wider px-8 py-3 rounded-full hover:bg-[#3D1F1F] transition-colors cursor-pointer whitespace-nowrap"
              >
                SHOP NOW
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-3 sm:gap-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-1">
                      <h3 className="font-['Inter'] text-xs sm:text-sm font-semibold text-[#3D1F1F] leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0 -mr-1"
                        aria-label="Remove item"
                      >
                        <i className="ri-close-line text-lg"></i>
                      </button>
                    </div>

                    {/* Selected Options */}
                    {Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0 ? (
                      (() => {
                        const displayOptions = item.selectedOptions.filter(
                          (opt: { name: string; value: string }) =>
                            opt.name.toLowerCase() !== 'title' && opt.value.toLowerCase() !== 'default title'
                        );
                        if (displayOptions.length === 0) return null;
                        return (
                          <div className="font-['Inter'] text-xs text-gray-500 mb-2 flex flex-wrap gap-x-1">
                            {displayOptions.map((opt: { name: string; value: string }, idx: number) => (
                              <span key={opt.name}>
                                {opt.name}: <span className="font-medium text-[#3D1F1F]">{opt.value}</span>
                                {idx < displayOptions.length - 1 && <span className="mx-1">•</span>}
                              </span>
                            ))}
                          </div>
                        );
                      })()
                    ) : !Array.isArray(item.selectedOptions) && (item.selectedOptions.length || item.selectedOptions.texture) ? (
                      <div className="font-['Inter'] text-xs text-gray-500 mb-2">
                        {item.selectedOptions.length && (
                          <span>Length: <span className="font-medium text-[#3D1F1F]">{item.selectedOptions.length}</span></span>
                        )}
                        {item.selectedOptions.length && item.selectedOptions.texture && (
                          <span className="mx-1">•</span>
                        )}
                        {item.selectedOptions.texture && (
                          <span>Texture: <span className="font-medium text-[#3D1F1F]">{item.selectedOptions.texture}</span></span>
                        )}
                      </div>
                    ) : null}

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <span className="font-['Inter'] text-sm font-bold text-[#631D26]">
                        {formatPrice(item.price, item.currencyCode)}
                      </span>

                      {/* Quantity Stepper — larger touch targets on mobile */}
                      <div className="flex items-center gap-1 border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#631D26] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="font-['Inter'] text-sm font-medium text-[#3D1F1F] w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#631D26] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — always pinned to bottom, never scrolls away */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 sm:px-6 py-4 sm:py-5 bg-[#FAF5F0] flex-shrink-0"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-['Inter'] text-sm font-medium text-gray-700">
                Subtotal
              </span>
              <span className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#631D26]">
                {formatPrice(cartTotal, items[0].currencyCode)}
              </span>
            </div>

            {/* Chargeback Agreement */}
            <label className="flex items-start gap-3 mb-4 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={chargebackAgreed}
                  onChange={(e) => setChargebackAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    chargebackAgreed
                      ? 'bg-[#631D26] border-[#631D26]'
                      : 'bg-white border-gray-400 group-hover:border-[#631D26]'
                  }`}
                >
                  {chargebackAgreed && (
                    <i className="ri-check-line text-white text-[11px]"></i>
                  )}
                </div>
              </div>
              <div>
                <p className="font-['Inter'] text-xs font-semibold text-[#3D1F1F] mb-0.5">
                  Chargeback Agreement
                </p>
                <p className="font-['Inter'] text-xs text-gray-500 leading-relaxed">
                  By completing a purchase, you agree to abide by our policies. Unilateral chargebacks without contacting support may result in documentation review and restrictions.
                </p>
              </div>
            </label>

            {/* Error Message */}
            {checkoutError && (
              <p className="font-['Inter'] text-xs text-red-500 mb-3 text-center">
                {checkoutError}
              </p>
            )}

            {/* Shipping Notice */}
            <p className="font-['Inter'] text-[10px] tracking-[0.15em] text-gray-400 text-center mb-3 leading-relaxed">
              Processing: 3–5 business days · Delivery: 2–5 business days ·{' '}
              <a
                href="/shipping-policy"
                className="text-gray-400 hover:text-[#631D26] transition-colors underline underline-offset-2 cursor-pointer whitespace-nowrap"
              >
                Shipping Policy →
              </a>
            </p>

            {/* Checkout Button — large tap target */}
            <button
              onClick={chargebackAgreed && !checkoutLoading ? handleCheckout : undefined}
              disabled={!chargebackAgreed || checkoutLoading}
              className={`w-full font-['Inter'] text-sm font-semibold tracking-wider px-6 py-4 rounded-full transition-colors whitespace-nowrap mb-3 flex items-center justify-center gap-2 min-h-[52px] ${
                chargebackAgreed && !checkoutLoading
                  ? 'bg-[#631D26] text-white hover:bg-[#3D1F1F] cursor-pointer active:scale-[0.98]'
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              {checkoutLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  PROCESSING...
                </>
              ) : (
                'CHECKOUT'
              )}
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full text-center font-['Inter'] text-sm text-gray-600 hover:text-[#631D26] transition-colors cursor-pointer py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
