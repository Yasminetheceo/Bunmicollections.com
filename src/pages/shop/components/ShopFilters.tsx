interface ShopFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeTexture: string;
  onTextureChange: (texture: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  productCount: number;
}

const categories = ['All', 'Extensions', 'Lace'];
const textures = ['All', 'Straight', 'Curly', 'Wavy'];

const ShopFilters = ({
  activeFilter,
  onFilterChange,
  activeTexture,
  onTextureChange,
  sortBy,
  onSortChange,
  productCount,
}: ShopFiltersProps) => {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 sm:top-20 z-30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Mobile: stacked rows */}
        <div className="flex flex-col sm:hidden py-2 gap-1">
          {/* Row 1: Type + Sort */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              <span className="font-['Inter'] text-[9px] tracking-[0.2em] text-[#C4A882] uppercase mr-1 shrink-0">Type</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className={`px-2 py-0.5 font-['Inter'] text-[11px] tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                    activeFilter === cat
                      ? 'text-[#631D26] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#631D26] after:rounded-full'
                      : 'text-gray-400 font-normal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="font-['Inter'] text-[11px] text-gray-500 bg-transparent border-none focus:outline-none cursor-pointer tracking-wide appearance-none pl-2 pr-4 shrink-0"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%239ca3af\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Row 2: Texture */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <span className="font-['Inter'] text-[9px] tracking-[0.2em] text-[#C4A882] uppercase mr-1 shrink-0">Texture</span>
            {textures.map((tex) => (
              <button
                key={tex}
                onClick={() => onTextureChange(tex)}
                className={`px-2 py-0.5 font-['Inter'] text-[11px] tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                  activeTexture === tex
                    ? 'text-[#631D26] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#631D26] after:rounded-full'
                    : 'text-gray-400 font-normal'
                }`}
              >
                {tex}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center justify-between h-12 gap-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {/* Type filters */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-['Inter'] text-[9px] tracking-[0.2em] text-[#C4A882] uppercase mr-2">Type</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className={`px-3 py-0.5 font-['Inter'] text-xs tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                    activeFilter === cat
                      ? 'text-[#631D26] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#631D26] after:rounded-full'
                      : 'text-gray-400 hover:text-gray-700 font-normal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200 shrink-0" />

            {/* Texture filters */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-['Inter'] text-[9px] tracking-[0.2em] text-[#C4A882] uppercase mr-2">Texture</span>
              {textures.map((tex) => (
                <button
                  key={tex}
                  onClick={() => onTextureChange(tex)}
                  className={`px-3 py-0.5 font-['Inter'] text-xs tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                    activeTexture === tex
                      ? 'text-[#631D26] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#631D26] after:rounded-full'
                      : 'text-gray-400 hover:text-gray-700 font-normal'
                  }`}
                >
                  {tex}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Count + Sort */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="font-['Inter'] text-[10px] text-gray-300 tracking-wide whitespace-nowrap">
              {productCount} {productCount === 1 ? 'item' : 'items'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="font-['Inter'] text-[11px] text-gray-500 bg-transparent border-none focus:outline-none cursor-pointer tracking-wide appearance-none pr-4"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%239ca3af\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopFilters;
