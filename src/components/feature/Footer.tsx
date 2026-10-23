import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#631D26] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Column — full width on smallest screens */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/14cb5efb514d06b8bd8991ed3d27bfe9.png"
                alt="Bunmi Collection"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Premium luxury hair extensions for the modern woman
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com/bunmicollection" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3D1F1F] text-[#D19B6D] hover:bg-[#D19B6D] hover:text-[#631D26] transition-all duration-300 cursor-pointer">
                <i className="ri-instagram-line text-base"></i>
              </a>
              <a href="https://www.tiktok.com/@bunmi.collection" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3D1F1F] text-[#D19B6D] hover:bg-[#D19B6D] hover:text-[#631D26] transition-all duration-300 cursor-pointer">
                <i className="ri-tiktok-fill text-base"></i>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-['Inter'] text-sm font-semibold tracking-wider mb-5 uppercase text-white">
              SHOP
            </h3>
            <ul className="space-y-3">
              {['All Products'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/hair-hub" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  Consultation Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-['Inter'] text-sm font-semibold tracking-wider mb-5 uppercase text-white">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping-policy" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 text-sm hover:text-[#D19B6D] transition-colors duration-300 cursor-pointer">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-['Inter'] text-sm font-semibold tracking-wider mb-5 uppercase text-white">
              GET IN TOUCH
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/70 text-sm">
                <i className="ri-mail-line text-[#D19B6D] mr-3 w-5 h-5 flex items-center justify-center flex-shrink-0"></i>
                <span className="break-all">hello@bunmicollection.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs sm:text-sm font-['Playfair_Display'] text-center sm:text-left">
              © {currentYear} Bunmi Collection. All rights reserved.
            </p>
            <div className="flex items-center space-x-3">
              <i className="ri-visa-line text-2xl sm:text-3xl text-white/50"></i>
              <i className="ri-mastercard-line text-2xl sm:text-3xl text-white/50"></i>
              <i className="ri-paypal-line text-2xl sm:text-3xl text-white/50"></i>
              <i className="ri-bank-card-line text-2xl sm:text-3xl text-white/50"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
