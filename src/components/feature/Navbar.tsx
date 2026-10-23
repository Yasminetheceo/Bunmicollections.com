import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartDrawer from './CartDrawer';

const ShopMegaMenu = () => {
  const productTypes = [
    { label: 'Extensions', filter: 'Extensions' },
    { label: 'Lace', filter: 'Lace' },
  ];

  const textures = [
    { label: 'Straight Hair', filter: 'Straight' },
    { label: 'Curly Hair', filter: 'Curly' },
    { label: 'Wavy Hair', filter: 'Wavy' },
  ];

  return (
    <div className="w-full bg-[#FAF5F0] shadow-2xl border-t-2 border-[#631D26] flex">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 w-full flex">

        {/* Shop by Product Type */}
        <div className="flex-1 px-10 py-10 border-r border-[#E8D5C4]">
          <p className="text-[10px] tracking-[0.2em] text-[#9B7B6A] uppercase mb-1 font-['Bebas_Neue']">SHOP BY</p>
          <h3 className="font-['Bebas_Neue'] text-2xl font-bold text-[#631D26] mb-6 tracking-wider">PRODUCT TYPE</h3>
          <div className="flex flex-col gap-3">
            {productTypes.map(({ label, filter }) => (
              <Link
                key={label}
                to={`/shop?category=${encodeURIComponent(filter)}`}
                className="font-['Inter'] text-sm text-[#3D1F1F] hover:text-[#631D26] hover:font-semibold transition-all cursor-pointer py-0.5 flex items-center gap-2 group"
              >
                <span className="w-0 h-px bg-[#631D26] group-hover:w-4 transition-all duration-200 inline-block"></span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Shop by Texture */}
        <div className="w-56 px-10 py-10 border-r border-[#E8D5C4]">
          <p className="text-[10px] tracking-[0.2em] text-[#9B7B6A] uppercase mb-1 font-['Bebas_Neue']">SHOP BY</p>
          <h3 className="font-['Bebas_Neue'] text-2xl font-bold text-[#631D26] mb-6 tracking-wider">TEXTURE</h3>
          <div className="flex flex-col gap-3">
            {textures.map(({ label, filter }) => (
              <Link
                key={label}
                to={`/shop?texture=${encodeURIComponent(filter)}`}
                className="font-['Inter'] text-sm text-[#3D1F1F] hover:text-[#631D26] hover:font-semibold transition-all cursor-pointer py-0.5 flex items-center gap-2 group"
              >
                <span className="w-0 h-px bg-[#631D26] group-hover:w-4 transition-all duration-200 inline-block"></span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured: Bunmi Raw Straight */}
        <div className="w-[420px] flex">
          <div className="w-44 overflow-hidden flex-shrink-0">
            <img
              src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/8a34eeaf2e911135901498b81bd854fe.png"
              alt="Bunmi Raw Straight"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 px-8 py-10 flex flex-col justify-center bg-[#F5EBE4]">
            <p className="text-[10px] tracking-[0.2em] text-[#9B7B6A] uppercase mb-2 font-['Bebas_Neue']">FEATURED</p>
            <h3 className="font-['Bebas_Neue'] text-xl font-bold text-[#631D26] leading-tight mb-1 uppercase tracking-wider">Bunmi</h3>
            <h4 className="font-['Bebas_Neue'] text-base text-[#7A4A3A] leading-tight mb-4 tracking-wider">Raw Straight</h4>
            <p className="font-['Inter'] text-xs text-[#6B4A3A] leading-relaxed mb-6">
              Naturally straight with a soft, authentic feel from root to end. BUNMI Raw Straight is completely unprocessed, with the cuticle intact and aligned in one direction, so it takes heat and color exceptionally well.
            </p>
            <Link
              to="/shop?texture=Straight&featured=bunmi-raw-straight"
              className="inline-block bg-[#631D26] text-white font-['Inter'] text-xs font-semibold tracking-widest px-5 py-3 rounded-full hover:bg-[#3D1F1F] transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, isCartOpen, openCart, closeCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(64);
  const shopMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure actual navbar height so mega menu sits flush with no gap
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [isScrolled, mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopMenuOpen(false);
  }, [location.pathname]);

  const handleShopEnter = () => {
    if (shopMenuTimeout.current) clearTimeout(shopMenuTimeout.current);
    setShopMenuOpen(true);
  };

  const handleShopLeave = () => {
    shopMenuTimeout.current = setTimeout(() => setShopMenuOpen(false), 120);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop', hasMega: true },
    { name: 'CONSULTATION HUB', path: '/hair-hub' },
    { name: 'HELP', path: '/help' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/484aa52ab36b0c529da710d0bd47d067.png"
                alt="Bunmi Collection"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Center Navigation — desktop only */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleShopEnter}
                    onMouseLeave={handleShopLeave}
                  >
                    <Link
                      to={link.path}
                      className={`font-['Inter'] text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        location.pathname === link.path
                          ? 'text-[#631D26]'
                          : 'text-gray-700 hover:text-[#631D26]'
                      }`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#631D26] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-['Inter'] text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer whitespace-nowrap ${
                      location.pathname === link.path
                        ? 'text-[#631D26]'
                        : 'text-gray-700 hover:text-[#631D26]'
                    }`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#631D26] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={openCart}
                className="relative w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#631D26] transition-colors duration-300 cursor-pointer"
              >
                <i className="ri-shopping-bag-line text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#631D26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center text-gray-700 transition-colors duration-300 cursor-pointer"
                aria-label="Toggle menu"
              >
                <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  location.pathname === link.path
                    ? 'bg-[#631D26]/10 text-[#631D26]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#631D26]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <button className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-['Inter'] text-sm cursor-pointer">
                <i className="ri-user-line mr-3 text-lg"></i>
                My Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu — top is set to the exact measured navbar height, zero gap */}
      <div
        className="hidden md:block"
        onMouseEnter={handleShopEnter}
        onMouseLeave={handleShopLeave}
        style={{
          position: 'fixed',
          top: `${navHeight}px`,
          left: 0,
          right: 0,
          zIndex: 49,
          visibility: shopMenuOpen ? 'visible' : 'hidden',
          pointerEvents: shopMenuOpen ? 'auto' : 'none',
          opacity: shopMenuOpen ? 1 : 0,
          transition: 'opacity 0.2s ease, visibility 0.2s',
        }}
      >
        <ShopMegaMenu />
      </div>

      {/* Overlay backdrop when mega menu is open */}
      {shopMenuOpen && (
        <div
          className="hidden md:block fixed inset-0 z-40 bg-black/10"
          onMouseEnter={handleShopLeave}
        />
      )}

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
