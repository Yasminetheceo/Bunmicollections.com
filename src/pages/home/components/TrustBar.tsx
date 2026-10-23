const TrustBar = () => {
  const features = [
    { icon: 'ri-truck-line', title: 'Free Shipping', description: 'On orders over $150' },
    { icon: 'ri-arrow-left-right-line', title: 'Easy Returns', description: '30-day return policy' },
    { icon: 'ri-shield-check-line', title: 'Secure Payment', description: '100% protected' },
    { icon: 'ri-customer-service-2-line', title: '24/7 Support', description: 'Dedicated assistance' },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#631D26] text-white rounded-full flex-shrink-0">
                <i className={`${feature.icon} text-lg sm:text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-['Inter'] font-semibold text-[#1a1a1a] text-xs sm:text-sm mb-0.5 sm:mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-xs font-['Inter']">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
