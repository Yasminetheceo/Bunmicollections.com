import { instagramPosts } from '../../../mocks/products';

const InstagramFeed = () => {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-['Bebas_Neue'] text-2xl sm:text-4xl lg:text-5xl text-[#1a1a1a] mb-3 sm:mb-4 flex flex-wrap items-center justify-center gap-2">
            <span>Follow</span>
            <span className="text-[#631D26]">@bunmicollection</span>
            <i className="ri-instagram-line text-[#631D26] text-3xl sm:text-5xl w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center"></i>
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg font-['Inter']">
            Join our community and get inspired
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="relative group overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer aspect-square"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#631D26]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-4 sm:space-x-6 text-white">
                  <div className="flex items-center">
                    <i className="ri-heart-fill text-lg sm:text-2xl mr-1 sm:mr-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                    <span className="font-['Inter'] font-semibold text-sm sm:text-lg">
                      {post.likes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-chat-3-fill text-lg sm:text-2xl mr-1 sm:mr-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                    <span className="font-['Inter'] font-semibold text-sm sm:text-lg">
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA Button */}
        <div className="text-center">
          <a
            href="https://instagram.com/bunmicollection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 sm:px-10 py-3 sm:py-4 bg-[#631D26] text-white font-['Inter'] font-medium text-sm sm:text-base rounded-full hover:bg-[#4A2323] transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            VIEW ON INSTAGRAM
            <i className="ri-external-link-line ml-3 text-lg sm:text-xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
