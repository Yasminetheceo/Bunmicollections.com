interface Option {
  id: string;
  name: string;
  values: string[];
}

interface Variant {
  id: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

interface VariantSelectorProps {
  options: Option[];
  variants: Variant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
  skipBundleDetection?: boolean;
}

const BUNDLE_KEYWORDS = ['bundle', 'closure', 'frontal', 'single', 'set', 'pcs'];
const LENGTH_KEYWORDS = ['length', 'size', 'inch', '"', 'in'];
const COLOR_KEYWORDS = ['color', 'colour', 'shade', 'tone'];

const isProductTypeOption = (option: Option): boolean => {
  const n = option.name.toLowerCase();
  // Check name for common bundle-related keywords
  if (n.includes('type') || n.includes('bundle') || n.includes('style') || n.includes('set')) {
    return true;
  }
  // Check values — if any value contains bundle keywords, treat as product type
  return option.values.some((v) =>
    BUNDLE_KEYWORDS.some((kw) => v.toLowerCase().includes(kw))
  );
};

const isLengthOption = (name: string): boolean => {
  const n = name.toLowerCase();
  return LENGTH_KEYWORDS.some((kw) => n.includes(kw));
};

const isColorOption = (name: string): boolean => {
  const n = name.toLowerCase();
  return COLOR_KEYWORDS.some((kw) => n.includes(kw));
};

// Detect if an option is Shopify's default "Title" placeholder
const isDefaultTitleOption = (option: Option): boolean => {
  const n = option.name.toLowerCase();
  return n === 'title' && option.values.length === 1 && option.values[0].toLowerCase() === 'default title';
};

// Sort and filter options: skip default Title, bundle type first, then length, then color, then others
const getRenderableOptions = (options: Option[]): Option[] => {
  // Filter out Shopify default "Title" placeholder
  const filtered = options.filter((opt) => !isDefaultTitleOption(opt));

  // Try to find which option should be bundle tabs
  const bundleIndex = filtered.findIndex(isProductTypeOption);

  // If no explicit bundle found, and there are 2+ options, mark the first non-length/non-color as bundle
  let marked = [...filtered];
  if (bundleIndex === -1 && filtered.length >= 2) {
    const firstNonSpecial = filtered.findIndex(
      (opt) => !isLengthOption(opt.name) && !isColorOption(opt.name)
    );
    if (firstNonSpecial !== -1) {
      // We'll handle this in the render by treating the first option as bundle
      // Just store this info for sorting
      const first = marked[firstNonSpecial];
      marked.splice(firstNonSpecial, 1);
      marked.unshift(first);
    }
  } else if (bundleIndex !== -1) {
    // Move bundle option to the front
    const bundle = marked[bundleIndex];
    marked.splice(bundleIndex, 1);
    marked.unshift(bundle);
  }

  return marked;
};

// Common color name → hex map
const COLOR_MAP: Record<string, string> = {
  'black': '#1a1a1a',
  'jet black': '#0a0a0a',
  'natural black': '#1a1a1a',
  'off black': '#2a2a2a',
  'dark brown': '#3B1F0E',
  'chocolate brown': '#5C3317',
  'medium brown': '#7B4A2D',
  'light brown': '#A0622A',
  'auburn': '#922B21',
  'burgundy': '#6D1A36',
  'dark burgundy': '#4A0E24',
  'wine': '#722F37',
  'blonde': '#D4A843',
  'dark blonde': '#B8860B',
  'honey blonde': '#D4A843',
  'platinum blonde': '#E8DCC8',
  'ash blonde': '#C8B89A',
  'strawberry blonde': '#D4956A',
  'caramel': '#C68642',
  'copper': '#B87333',
  'red': '#8B1A1A',
  'chestnut': '#6B3A2A',
  'ombre': 'linear-gradient(135deg, #1a1a1a 50%, #A0622A 100%)',
  'grey': '#9E9E9E',
  'gray': '#9E9E9E',
  'silver': '#C0C0C0',
  'white': '#F5F5F5',
  'mixed': 'linear-gradient(135deg, #1a1a1a 33%, #7B4A2D 66%, #D4A843 100%)',
};

const getColorStyle = (value: string): string | null => {
  const key = value.toLowerCase().trim();
  return COLOR_MAP[key] ?? null;
};

const VariantSelector = ({
  options,
  variants,
  selectedOptions,
  onOptionChange,
  skipBundleDetection = false,
}: VariantSelectorProps) => {
  const isValueAvailable = (optionName: string, value: string): boolean => {
    const testOptions = { ...selectedOptions, [optionName]: value };
    return variants.some(
      (v) =>
        v.selectedOptions.every((o) => testOptions[o.name] === o.value) &&
        v.availableForSale
    );
  };

  if (!options.length) return null;

  const renderableOptions = getRenderableOptions(options);

  // Determine which option should be the bundle tabs (first in sorted list, or first non-special)
  // When skipBundleDetection is true, no option gets the bundle tab treatment
  const bundleOptionIndex = skipBundleDetection ? -1 : renderableOptions.findIndex(isProductTypeOption);
  const firstRenderableIndex = bundleOptionIndex !== -1 ? bundleOptionIndex : (skipBundleDetection ? -1 : 0);

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      {renderableOptions.map((option, renderIndex) => {
        const isLength = isLengthOption(option.name);
        const isColor = isColorOption(option.name);
        // First renderable option is always the bundle tabs if product has multiple options
        const isBundle = renderableOptions.length > 1 && renderIndex === firstRenderableIndex;
        const selectedValue = selectedOptions[option.name] || '';

        // ── BUNDLE TABS — horizontal tabs with header ──
        if (isBundle) {
          return (
            <div key={option.id} className="flex flex-col gap-0 w-full">
              {/* Section header */}
              <div className="bg-[#F5F0EB] px-4 py-2.5 mb-3">
                <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-gray-400">
                  Select Your Bundle
                </span>
              </div>

              {/* Horizontal tabs */}
              <div className="flex w-full border border-[#E8E4E0]">
                {option.values.map((value, idx) => {
                  const isSelected = selectedValue === value;
                  const available = isValueAvailable(option.name, value);
                  const badgeMatch = value.match(/\((\d+\s*PCS?)\)/i);
                  const badge = badgeMatch ? badgeMatch[1] : null;
                  const cleanValue = value.replace(/\s*\([^)]*\)/, '').trim();

                  return (
                    <button
                      key={value}
                      onClick={() => available && onOptionChange(option.name, value)}
                      disabled={!available}
                      className={`relative flex-1 flex flex-col items-center justify-center py-3 px-2 text-center transition-all duration-200 cursor-pointer whitespace-nowrap
                        ${idx !== 0 ? 'border-l border-[#E8E4E0]' : ''}
                        ${isSelected
                          ? 'bg-[#1a1a1a] text-white'
                          : available
                            ? 'bg-white text-[#1a1a1a] hover:bg-[#F7F4F1]'
                            : 'bg-white text-gray-300 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase leading-tight">
                        {cleanValue}
                      </span>
                      {badge && (
                        <span className={`font-['Inter'] text-[8px] tracking-wider uppercase mt-0.5 px-1.5 py-0.5 leading-none
                          ${isSelected ? 'bg-white/20 text-white' : 'bg-[#631D26] text-white'}
                        `}>
                          {badge}
                        </span>
                      )}
                      {!available && (
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                          <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // ── LENGTH — grid with section header ──
        if (isLength) {
          return (
            <div key={option.id} className="flex flex-col gap-0 w-full">
              {/* Section header */}
              <div className="bg-[#F5F0EB] px-4 py-2.5 mb-3">
                <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-gray-400">
                  Select Your {option.name}
                </span>
              </div>

              {/* Current selection label */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-gray-400">
                  {option.name}
                </span>
                {selectedValue && (
                  <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
                    {selectedValue}
                  </span>
                )}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedValue === value;
                  const available = isValueAvailable(option.name, value);

                  return (
                    <button
                      key={value}
                      onClick={() => available && onOptionChange(option.name, value)}
                      disabled={!available}
                      className={`relative h-11 flex items-center justify-center font-['Inter'] text-[12px] font-medium tracking-wide border transition-all duration-200 cursor-pointer
                        ${isSelected
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : available
                            ? 'bg-white text-[#1a1a1a] border-[#C8C0B8] hover:border-[#1a1a1a]'
                            : 'bg-transparent text-gray-300 border-[#E8E4E0] cursor-not-allowed'
                        }`}
                    >
                      {value}
                      {!available && (
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                          <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // ── COLOR — swatches ──
        if (isColor) {
          return (
            <div key={option.id} className="flex flex-col items-start gap-2.5 w-full">
              <span className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-gray-400">
                {option.name}
                {selectedValue && (
                  <span className="ml-2 text-[#1a1a1a] font-medium">
                    {selectedValue}
                  </span>
                )}
              </span>
              <div className="flex flex-wrap justify-start gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedValue === value;
                  const available = isValueAvailable(option.name, value);
                  const colorStyle = getColorStyle(value);
                  const isGradient = colorStyle?.startsWith('linear-gradient') ?? false;

                  if (colorStyle) {
                    return (
                      <button
                        key={value}
                        onClick={() => available && onOptionChange(option.name, value)}
                        disabled={!available}
                        title={value}
                        className={`relative w-7 h-7 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0
                          ${isSelected ? 'ring-2 ring-offset-2 ring-[#1a1a1a]' : 'ring-1 ring-transparent hover:ring-gray-300 hover:ring-offset-1'}
                          ${!available ? 'opacity-30 cursor-not-allowed' : ''}
                        `}
                        style={isGradient ? { background: colorStyle } : { backgroundColor: colorStyle }}
                      >
                        {!available && (
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="absolute w-full h-px bg-gray-400/60 rotate-45" />
                          </span>
                        )}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={value}
                      onClick={() => available && onOptionChange(option.name, value)}
                      disabled={!available}
                      className={`relative px-3 h-9 flex items-center justify-center font-['Inter'] text-[11px] font-medium tracking-wide border transition-all duration-200 whitespace-nowrap cursor-pointer
                        ${isSelected
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : available
                            ? 'bg-transparent text-[#1a1a1a] border-[#C8C0B8] hover:border-[#1a1a1a]'
                            : 'bg-transparent text-gray-300 border-[#E8E4E0] cursor-not-allowed'
                        }`}
                    >
                      {value}
                      {!available && (
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                          <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // ── DEFAULT — pill buttons ──
        return (
          <div key={option.id} className="flex flex-col items-start gap-2.5 w-full">
            <span className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-gray-400">
              {option.name}
              {selectedValue && (
                <span className="ml-2 text-[#1a1a1a] font-medium">
                  {selectedValue}
                </span>
              )}
            </span>
            <div className="flex flex-wrap justify-start gap-2">
              {option.values.map((value) => {
                const isSelected = selectedValue === value;
                const available = isValueAvailable(option.name, value);

                return (
                  <button
                    key={value}
                    onClick={() => available && onOptionChange(option.name, value)}
                    disabled={!available}
                    className={`relative px-3 h-9 flex items-center justify-center font-['Inter'] text-[11px] font-medium tracking-wide border transition-all duration-200 whitespace-nowrap cursor-pointer
                      ${isSelected
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                        : available
                          ? 'bg-transparent text-[#1a1a1a] border-[#C8C0B8] hover:border-[#1a1a1a]'
                          : 'bg-transparent text-gray-300 border-[#E8E4E0] cursor-not-allowed'
                      }`}
                  >
                    {value}
                    {!available && (
                      <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                        <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;