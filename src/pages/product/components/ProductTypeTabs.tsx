import { useState, useMemo } from 'react';

/* ── Types ── */
interface Option {
  id: string;
  name: string;
  values: string[];
}

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: string;
  currencyCode: string;
  compareAtPrice: string | null;
  selectedOptions: { name: string; value: string }[];
}

interface ProductTypeTabsProps {
  options: Option[];
  variants: Variant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
  isRaw?: boolean;
}

/* ── Tab detection keywords (title fallback only) ── */
const TYPE_MAP: Record<string, string[]> = {
  'single-bundle': ['single', '1 pc', '1 bundle', 'individual'],
  'bundle-set': ['bundle set', '3 bundle', '3 pc', '3 pcs', '3pcs', 'bundle 3'],
  'closure-set': ['closure set', 'closure + bundle', 'closure'],
  'frontal-set': ['frontal set', 'frontal + bundle', 'frontal'],
};

/* ── Normalize a value for comparison: strip whitespace, quotes, extra chars ── */
function normalizeVal(v: string): string {
  return v.replace(/[\s"'/\\]/g, '').toLowerCase();
}

/* ── Size patterns for detection ── */
const CLOSURE_SIZE_PATTERNS = ['4x4', '5x5', '6x6', '7x7'];
const FRONTAL_SIZE_PATTERNS = ['13x4', '13x6'];

/* ── Extract ALL size-like substrings from a value (handles embedded like "Closure 4x4 Set") ── */
function extractSizePatterns(val: string): string[] {
  const norm = normalizeVal(val);
  const results: string[] = [];
  // Look for \d+x\d+ anywhere in the string
  const regex = /(\d+)x(\d+)/gi;
  let match;
  while ((match = regex.exec(norm)) !== null) {
    results.push(`${match[1]}x${match[2]}`);
  }
  return results;
}

/* ── Extract combo-like substrings from a value (anything containing "+") ── */
function extractComboPatterns(val: string): string[] {
  // Look for patterns like 14"+16"+18" or 14 + 16 + 18
  const results: string[] = [];
  const plusIdx = val.indexOf('+');
  if (plusIdx !== -1) {
    // Take the full value as a combo — but also try to extract clean substrings
    results.push(val);

    // Also try to extract a cleaner version: e.g. from "Closure 4x4 / 14\"+16\"+18\""
    // match the length+length+length pattern
    const norm = val.replace(/\s/g, '');
    const comboRegex = /(\d+["]\s*\+\s*\d+["]\s*\+\s*\d+["])/;
    const cleanMatch = val.match(comboRegex);
    if (cleanMatch) {
      const clean = cleanMatch[1].replace(/\s/g, '');
      if (clean !== val) results.push(clean);
    }
  }
  return results;
}

/* ── Detect variant type from its option VALUES ── */
function detectVariantType(variant: Variant): string | null {
  const allValues = variant.selectedOptions.map((o) => o.value);
  const rawText = allValues.join(' ').toLowerCase();
  const normalizedText = normalizeVal(rawText);

  // Check for closure sizes (4x4, 7x7, etc.) anywhere in values
  const hasClosureSize = CLOSURE_SIZE_PATTERNS.some((p) => normalizedText.includes(p));
  // Check for frontal sizes (13x4, 13x6) anywhere in values
  const hasFrontalSize = FRONTAL_SIZE_PATTERNS.some((p) => normalizedText.includes(p));

  if (hasClosureSize) return 'closure-set';
  if (hasFrontalSize) return 'frontal-set';

  // Check raw option VALUES for type keywords
  if (rawText.includes('closure')) return 'closure-set';
  if (rawText.includes('frontal')) return 'frontal-set';

  // Check for combo pattern: contains "+" → bundle-set
  const hasCombo = allValues.some((v) => v.includes('+'));
  // Check for single length: value looks like a measurement (e.g., 14")
  const hasLength = allValues.some((v) => /^\d+["]/.test(v.trim()));

  if (hasCombo) return 'bundle-set';
  if (hasLength) return 'single-bundle';

  // Fallback: try title keywords
  const text = variant.title.toLowerCase();
  for (const [type, kws] of Object.entries(TYPE_MAP)) {
    if (kws.some((kw) => text.includes(kw.toLowerCase()))) return type;
  }

  return null;
}

/* ── Default combos used as fallback when no variants provide combos ── */
const DEFAULT_COMBOS = [
  '14" + 16" + 18"',
  '16" + 18" + 20"',
  '18" + 20" + 22"',
  '20" + 22" + 24"',
  '22" + 24" + 26"',
];

/* ── Default single lengths used as fallback ── */
const DEFAULT_SINGLE_LENGTHS = ['14"', '16"', '18"', '20"', '22"', '24"', '26"'];

/* ── Check if a value is a pure size (e.g. 4x4, 13x6) ── */
function looksLikePureSize(val: string): boolean {
  return /^\d+x\d+$/i.test(normalizeVal(val));
}

/* ── Check if a value is a real length measurement (e.g. 18", 20, 22 in) ── */
function looksLikeLength(val: string): boolean {
  return /^\d+(?:\.\d+)?\s*(?:"|in|inch|inches)?$/i.test(val.trim());
}

/* ── Check if a value contains a size pattern anywhere ── */
function containsSizePattern(val: string): boolean {
  return extractSizePatterns(val).length > 0;
}

/* ── Check if a value looks like a combo (contains "+") ── */
function looksLikeCombo(val: string): boolean {
  return val.includes('+');
}

/* ── Given a value that may contain both size and combo, extract just the combo part ── */
function extractCleanCombo(val: string): string {
  // Strip quotes/spaces for consistent comparison
  const cleaned = val.replace(/\s/g, '');
  // Capture the FULL combo — any number of length groups joined by "+" (3, 4, etc.)
  const match = cleaned.match(/\d+["](?:\+\d+["])+/);
  if (match) return match[0];
  return cleaned;
}

/* ── Check if a variant matches a given size and combo ── */
function variantMatchesOptions(
  variant: Variant,
  sizeValue: string | undefined,
  comboValue: string | undefined,
): boolean {
  const allValues = variant.selectedOptions.map((o) => o.value);
  const normalizedValues = allValues.map(normalizeVal);
  const combinedNormalized = normalizedValues.join('');

  if (sizeValue) {
    const normSize = normalizeVal(sizeValue);
    // Check if the size pattern appears in any option value or in the combined text
    const sizeFound = normalizedValues.some((v) => v.includes(normSize)) ||
      combinedNormalized.includes(normSize);
    if (!sizeFound) return false;
  }

  if (comboValue) {
    const normCombo = normalizeVal(comboValue);
    // Check if the combo pattern appears in any option value or in the combined text
    const comboFound = normalizedValues.some((v) => v.includes(normCombo)) ||
      combinedNormalized.includes(normCombo);
    if (!comboFound) return false;
  }

  return true;
}

/* ── Count the bundles (length groups) inside a combo ── */
function countBundles(combo: string): number {
  return combo.split('+').filter((s) => s.trim().length > 0).length;
}

/* ── Sort combos: smallest bundle count first, then by starting length ── */
function compareCombos(a: string, b: string): number {
  const aCount = countBundles(a);
  const bCount = countBundles(b);
  if (aCount !== bCount) return aCount - bCount;
  const aNum = parseInt(a.split('+')[0], 10);
  const bNum = parseInt(b.split('+')[0], 10);
  if (!Number.isNaN(aNum) && !Number.isNaN(bNum) && aNum !== bNum) return aNum - bNum;
  return a.localeCompare(b);
}

/* ── Extract unique size and combo values from variants of a given type ── */
function extractTypeOptions(
  variants: Variant[],
  type: string,
): { sizes: string[]; combos: string[] } {
  const sizes = new Set<string>();
  const combos = new Set<string>();

  variants
    .filter((v) => detectVariantType(v) === type)
    .forEach((v) => {
      v.selectedOptions.forEach((o) => {
        const value = o.value;
        // Extract embedded size patterns (e.g. "4x4" inside "Closure 4x4 Set")
        const sizePatterns = extractSizePatterns(value);
        sizePatterns.forEach((s) => sizes.add(s));

        // If value has a "+", it's a combo
        if (value.includes('+')) {
          // Try to get a clean combo string
          const clean = extractCleanCombo(value);
          combos.add(clean);
        }
      });
    });

  return { sizes: [...sizes].sort(), combos: [...combos].sort(compareCombos) };
}

/* ── Component ── */
const ProductTypeTabs = ({
  options,
  variants,
  selectedOptions,
  onOptionChange,
  isRaw = false,
}: ProductTypeTabsProps) => {
  // Determine which product type is currently selected
  const activeType = useMemo(() => {
    const currentVariant = variants.find((v) =>
      v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    );
    if (currentVariant) return detectVariantType(currentVariant) ?? 'single-bundle';
    return 'single-bundle';
  }, [selectedOptions, variants]);

  // ── Dynamically extract options for each type ──
  const typeOptions = useMemo(() => ({
    'single-bundle': extractTypeOptions(variants, 'single-bundle'),
    'bundle-set': extractTypeOptions(variants, 'bundle-set'),
    'closure-set': extractTypeOptions(variants, 'closure-set'),
    'frontal-set': extractTypeOptions(variants, 'frontal-set'),
  }), [variants]);

  // Single bundle lengths — dynamic from variants, fallback to defaults
  const singleLengths = useMemo(() => {
    const fromVariants = typeOptions['single-bundle'].combos.length > 0
      ? typeOptions['single-bundle'].combos
      : variants
          .filter((v) => detectVariantType(v) === 'single-bundle')
          .flatMap((v) => v.selectedOptions.map((o) => o.value))
          .filter((v) => !looksLikePureSize(v) && !looksLikeCombo(v) && looksLikeLength(v));

    const unique = [...new Set(fromVariants)].sort();
    const capped = unique.slice(0, 7);
    return capped.length > 0 ? capped : DEFAULT_SINGLE_LENGTHS;
  }, [typeOptions, variants]);

  // Bundle set combos — dynamic from variants, fallback to defaults
  const bundleSetCombos = useMemo(() => {
    const c = typeOptions['bundle-set'].combos;
    return c.length > 0 ? c : DEFAULT_COMBOS;
  }, [typeOptions]);

  // Closure set sizes — dynamic from variants
  const closureSizes = useMemo(() => {
    const s = typeOptions['closure-set'].sizes;
    if (s.length === 0) {
      // Deep scan: check ALL values of closure-set variants for embedded size patterns
      const fromOptions = variants
        .filter((v) => detectVariantType(v) === 'closure-set')
        .flatMap((v) => {
          const extracted: string[] = [];
          v.selectedOptions.forEach((o) => {
            extractSizePatterns(o.value).forEach((p) => extracted.push(p));
          });
          return extracted;
        });
      const unique = [...new Set(fromOptions)].sort();
      return unique.length > 0 ? unique : ['4x4', '7x7'];
    }
    return s;
  }, [typeOptions, variants]);

  // Closure set combos — dynamic from variants
  const closureSetCombos = useMemo(() => {
    const c = typeOptions['closure-set'].combos;
    return c.length > 0 ? c : DEFAULT_COMBOS;
  }, [typeOptions]);

  // Frontal set sizes — dynamic from variants
  const frontalSizes = useMemo(() => {
    const s = typeOptions['frontal-set'].sizes;
    if (s.length === 0) {
      const fromOptions = variants
        .filter((v) => detectVariantType(v) === 'frontal-set')
        .flatMap((v) => {
          const extracted: string[] = [];
          v.selectedOptions.forEach((o) => {
            extractSizePatterns(o.value).forEach((p) => extracted.push(p));
          });
          return extracted;
        });
      const unique = [...new Set(fromOptions)].sort();
      return unique.length > 0 ? unique : ['13x4', '13x6'];
    }
    return s;
  }, [typeOptions, variants]);

  // Frontal set combos — dynamic from variants
  const frontalSetCombos = useMemo(() => {
    const c = typeOptions['frontal-set'].combos;
    return c.length > 0 ? c : DEFAULT_COMBOS;
  }, [typeOptions]);

  const [tab, setTab] = useState<'single-bundle' | 'bundle-set' | 'closure-set' | 'frontal-set'>(
    activeType as any
  );

  // Closure / Frontal size state — init from actual available sizes
  const [closureSize, setClosureSize] = useState<string>(closureSizes[0] || '4x4');
  const [frontalSize, setFrontalSize] = useState<string>(frontalSizes[0] || '13x4');

  // Track selected combo for each tab — init from actual available combos
  const [bundleSetCombo, setBundleSetCombo] = useState<string>(bundleSetCombos[0] || DEFAULT_COMBOS[0]);
  const [closureSetCombo, setClosureSetCombo] = useState<string>(closureSetCombos[0] || DEFAULT_COMBOS[0]);
  const [frontalSetCombo, setFrontalSetCombo] = useState<string>(frontalSetCombos[0] || DEFAULT_COMBOS[0]);
  const [singleLength, setSingleLength] = useState<string>(singleLengths[0] || '14"');

  // Update defaults when dynamic options change
  useMemo(() => {
    if (closureSizes.length > 0 && !closureSizes.includes(closureSize)) {
      setClosureSize(closureSizes[0]);
    }
  }, [closureSizes]);
  useMemo(() => {
    if (frontalSizes.length > 0 && !frontalSizes.includes(frontalSize)) {
      setFrontalSize(frontalSizes[0]);
    }
  }, [frontalSizes]);
  useMemo(() => {
    if (closureSetCombos.length > 0 && !closureSetCombos.includes(closureSetCombo)) {
      setClosureSetCombo(closureSetCombos[0]);
    }
  }, [closureSetCombos]);
  useMemo(() => {
    if (frontalSetCombos.length > 0 && !frontalSetCombos.includes(frontalSetCombo)) {
      setFrontalSetCombo(frontalSetCombos[0]);
    }
  }, [frontalSetCombos]);
  useMemo(() => {
    if (bundleSetCombos.length > 0 && !bundleSetCombos.includes(bundleSetCombo)) {
      setBundleSetCombo(bundleSetCombos[0]);
    }
  }, [bundleSetCombos]);
  useMemo(() => {
    if (singleLengths.length > 0 && !singleLengths.includes(singleLength)) {
      setSingleLength(singleLengths[0]);
    }
  }, [singleLengths]);

  // Only show tabs for types that actually have matching variants
  const ALL_TABS = [
    { id: 'single-bundle', label: 'Single\nBundle', badge: null },
    { id: 'bundle-set', label: 'Bundle Set', badge: '3 PCS' },
    { id: 'closure-set', label: 'Closure Sets', badge: null },
    { id: 'frontal-set', label: 'Frontal Sets', badge: null },
  ] as const;

  const tabs = useMemo(() => {
    return ALL_TABS.filter((t) =>
      variants.some((v) => detectVariantType(v) === t.id)
    );
  }, [variants]);

  // If the current tab doesn't exist in available types, fall back to first available
  const safeTab = useMemo(() => {
    if (tabs.length === 0) return tab;
    const tabIds = tabs.map((t) => t.id);
    if (!tabIds.includes(tab as any)) return tabIds[0];
    return tab;
  }, [tab, tabs]);

  // ── Select a variant by its type and options ──
  const selectVariant = (
    type: 'single-bundle' | 'bundle-set' | 'closure-set' | 'frontal-set',
    combo?: string,
    size?: string
  ): Variant | null => {
    // Try exact match using substring/embedded matching
    let matching = variants.find((v) => {
      const vType = detectVariantType(v);
      if (vType !== type) return false;

      if (type === 'single-bundle' && combo) {
        return variantMatchesOptions(v, undefined, combo);
      }

      if ((type === 'closure-set' || type === 'frontal-set') && size) {
        return variantMatchesOptions(v, size, combo ?? undefined);
      }

      if (combo) {
        return variantMatchesOptions(v, undefined, combo);
      }

      return true;
    });

    // Fallback: if no exact match, just pick the first variant of this type
    if (!matching) {
      matching = variants.find((v) => detectVariantType(v) === type) ?? null;
    }

    if (matching) {
      matching.selectedOptions.forEach((o) => {
        onOptionChange(o.name, o.value);
      });
    }

    return matching;
  };

  // ── When switching tabs, select the first available variant ──
  const handleTabChange = (newTab: typeof tab) => {
    setTab(newTab);
    const matched = selectVariant(
      newTab,
      newTab === 'single-bundle' ? singleLength
        : newTab === 'bundle-set' ? bundleSetCombo
        : newTab === 'closure-set' ? closureSetCombo
        : frontalSetCombo,
      newTab === 'closure-set' ? closureSize
        : newTab === 'frontal-set' ? frontalSize
        : undefined
    );

    // Sync local state to what the matched variant actually contains
    if (matched) {
      const opts = matched.selectedOptions;
      if (newTab === 'closure-set') {
        // Extract size from any option value (handles embedded patterns)
        const matchedSize = (() => {
          for (const o of opts) {
            const patterns = extractSizePatterns(o.value);
            if (patterns.length > 0) return patterns[0];
          }
          return null;
        })();
        const matchedCombo = opts.find((o) => o.value.includes('+'));
        if (matchedSize) setClosureSize(matchedSize);
        if (matchedCombo) setClosureSetCombo(extractCleanCombo(matchedCombo.value));
      } else if (newTab === 'frontal-set') {
        const matchedSize = (() => {
          for (const o of opts) {
            const patterns = extractSizePatterns(o.value);
            if (patterns.length > 0) return patterns[0];
          }
          return null;
        })();
        const matchedCombo = opts.find((o) => o.value.includes('+'));
        if (matchedSize) setFrontalSize(matchedSize);
        if (matchedCombo) setFrontalSetCombo(extractCleanCombo(matchedCombo.value));
      } else if (newTab === 'bundle-set') {
        const matchedCombo = opts.find((o) => o.value.includes('+'));
        if (matchedCombo) setBundleSetCombo(extractCleanCombo(matchedCombo.value));
      } else if (newTab === 'single-bundle') {
        const matchedVal = opts.find((o) => !containsSizePattern(o.value) && !looksLikeCombo(o.value));
        if (matchedVal) setSingleLength(matchedVal.value);
      }
    }
  };

  // ── Helper to get a nicely formatted display label for a size ──
  const formatSizeLabel = (value: string): string => {
    const norm = normalizeVal(value);
    const match = norm.match(/^(\d+)x(\d+)(.*)$/);
    if (match) {
      const suffix = match[3] ? ` ${match[3].toUpperCase()}` : '';
      return `${match[1]} \u00d7 ${match[2]}${suffix}`;
    }
    return value;
  };

  // Bundle count badge — live count for raw products, literal otherwise
  const bundleCountLabel = (combo: string): string => {
    if (!isRaw) return '3 BUNDLES';
    return `${countBundles(combo)} BUNDLES`;
  };

  // ── Helper to check if a variant is available for given size+combo ──
  const isVariantAvailable = (
    type: string,
    sizeVal?: string,
    comboVal?: string,
  ): boolean => {
    return variants.some((v) => {
      if (detectVariantType(v) !== type) return false;
      if (!v.availableForSale) return false;
      return variantMatchesOptions(v, sizeVal, comboVal ?? undefined);
    });
  };

  // ── Tab headers ──
  const tabHeader = (
    <div className="flex flex-col gap-2">
      <span className="font-['Inter'] text-[9px] tracking-[0.35em] uppercase text-[#631D26]">
        Product Type
      </span>
      <div className="flex w-full border border-[#E8E4E0]">
        {tabs.map((t, idx) => {
          const isActive = safeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-3 px-1 text-center transition-all duration-200 cursor-pointer whitespace-nowrap
                ${idx !== 0 ? 'border-l border-[#E8E4E0]' : ''}
                ${isActive
                  ? 'bg-[#631D26] text-white'
                  : 'bg-white text-[#1a1a1a] hover:bg-[#F7F4F1]'
                }
              `}
            >
              <span className="font-['Inter'] text-[10px] tracking-[0.15em] uppercase leading-tight">
                {t.label.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
              {t.badge && (
                <span className={`font-['Inter'] text-[8px] tracking-wider uppercase mt-0.5 px-1.5 py-0.5 leading-none
                  ${isActive ? 'bg-white/20 text-white' : 'bg-[#631D26] text-white'}
                `}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── Section header copy (raw products get the mockup wording) ──
  const sectionCopy: Record<string, { title: string; desc: string }> = isRaw
    ? {
        'single-bundle': {
          title: 'Single Bundle',
          desc: 'Each bundle is sold individually. Select your preferred length below.',
        },
        'bundle-set': {
          title: 'Bundle Set',
          desc: 'Sets up to 22" include 3 bundles in one length. Sets at 24" and up include 4 bundles for full density.',
        },
        'closure-set': {
          title: 'Closure + Bundles',
          desc: 'Each set includes your chosen closure size plus 3 bundles in one length up to 22", or 4 bundles at 24" and up. A 20" 4x4 closure comes with every order.',
        },
        'frontal-set': {
          title: 'Frontal + Bundles',
          desc: 'Each set includes your chosen frontal size plus 3 bundles in one length up to 22", or 4 bundles at 24" and up. A 20" 13x6 frontal comes with every order.',
        },
      }
    : {
        'single-bundle': {
          title: 'Single Bundle',
          desc: 'Each bundle is sold individually. Select your preferred length below.',
        },
        'bundle-set': {
          title: 'Select Your Bundle Set — 3 Bundles',
          desc: 'Each set includes 3 bundles in graduating lengths for a full, seamless install.',
        },
        'closure-set': {
          title: 'Closure + 3 Bundles',
          desc: 'Each closure set includes your chosen closure size paired with 3 matching bundles for a complete install.',
        },
        'frontal-set': {
          title: 'Frontal + 3 Bundles',
          desc: 'Each frontal set includes your chosen frontal size paired with 3 matching bundles for a seamless, full-coverage install.',
        },
      };

  // ── Section header with description ──
  const sectionHeader = (
    <div className="bg-[#F5F0EB] px-4 py-3">
      <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
        {sectionCopy[safeTab]?.title}
      </span>
      <p className="font-['Inter'] text-[10px] italic text-gray-400 mt-1 leading-relaxed">
        {sectionCopy[safeTab]?.desc}
      </p>
    </div>
  );

  // ── SINGLE BUNDLE TAB ──
  const singleBundleUI = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
            Length
          </span>
          <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
            {singleLength}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {singleLengths.map((length) => {
            const isSelected = singleLength === length;
            const hasVariant = variants.some((v) => {
              const vType = detectVariantType(v);
              return vType === 'single-bundle' && v.availableForSale &&
                v.selectedOptions.some((o) => normalizeVal(o.value).includes(normalizeVal(length)));
            });
            return (
              <button
                key={length}
                onClick={() => {
                  if (!hasVariant) return;
                  setSingleLength(length);
                  selectVariant('single-bundle', length);
                }}
                disabled={!hasVariant}
                className={`relative h-11 flex items-center justify-center font-['Inter'] text-[12px] font-medium tracking-wide border transition-all duration-200 cursor-pointer
                  ${isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : hasVariant
                      ? 'bg-white text-[#1a1a1a] border-[#C8C0B8] hover:border-[#1a1a1a]'
                      : 'bg-transparent text-gray-300 border-[#E8E4E0] cursor-not-allowed'
                  }`}
              >
                {length}
                {!hasVariant && (
                  <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── BUNDLE SET TAB ──
  const bundleSetUI = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
          {isRaw ? 'Bundle Lengths' : 'Bundle Set'}
        </span>
        <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
          {bundleSetCombo}
        </span>
      </div>
      {bundleSetCombos.map((combo) => {
        const isSelected = bundleSetCombo === combo;
        const hasVariant = isVariantAvailable('bundle-set', undefined, combo);
        return (
          <button
            key={combo}
            onClick={() => {
              if (!hasVariant) return;
              setBundleSetCombo(combo);
              selectVariant('bundle-set', combo);
            }}
            disabled={!hasVariant}
            className={`relative flex items-center justify-between px-5 py-4 border transition-all duration-200 cursor-pointer text-left
              ${isSelected
                ? 'bg-[#FAF5F0] border-[#631D26]'
                : hasVariant
                  ? 'bg-white border-[#C8C0B8] hover:border-[#1a1a1a]'
                  : 'bg-transparent border-[#E8E4E0] cursor-not-allowed'
              }`}
          >
            <span className={`font-['Inter'] text-sm font-medium ${isSelected ? 'text-[#631D26]' : 'text-[#1a1a1a]'}`}>
              {combo}
            </span>
            <span className={`font-['Inter'] text-[10px] tracking-[0.15em] uppercase ${isSelected ? 'text-[#631D26]' : 'text-gray-400'}`}>
              {bundleCountLabel(combo)}
            </span>
            {!hasVariant && (
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  // ── CLOSURE SET TAB ──
  const closureSetUI = (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      {closureSizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
              Closure Size
            </span>
            <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
              {formatSizeLabel(closureSize)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {closureSizes.map((sizeVal) => {
              const isSelected = closureSize === sizeVal;
              const hasVariant = isVariantAvailable('closure-set', sizeVal, closureSetCombo);
              return (
                <button
                  key={sizeVal}
                  onClick={() => {
                    if (!hasVariant) return;
                    setClosureSize(sizeVal);
                    selectVariant('closure-set', closureSetCombo, sizeVal);
                  }}
                  disabled={!hasVariant}
                  className={`relative flex flex-col items-center justify-center py-4 border transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'bg-[#FAF5F0] border-[#631D26]'
                      : hasVariant
                        ? 'bg-white border-[#C8C0B8] hover:border-[#1a1a1a]'
                        : 'bg-transparent border-[#E8E4E0] cursor-not-allowed'
                    }`}
                >
                  <span className={`font-['Inter'] text-sm font-medium ${isSelected ? 'text-[#631D26]' : 'text-[#1a1a1a]'}`}>
                    {formatSizeLabel(sizeVal)}
                  </span>
                  {!hasVariant && (
                    <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                      <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bundle lengths — always show, even if sizes are present */}
      {closureSetCombos.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
              Bundle Lengths
            </span>
            <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
              {closureSetCombo}
            </span>
          </div>
          {closureSetCombos.map((combo) => {
            const isSelected = closureSetCombo === combo;
            const hasVariant = isVariantAvailable('closure-set', closureSizes.length > 0 ? closureSize : undefined, combo);
            return (
              <button
                key={combo}
                onClick={() => {
                  if (!hasVariant) return;
                  setClosureSetCombo(combo);
                  selectVariant('closure-set', combo, closureSizes.length > 0 ? closureSize : undefined);
                }}
                disabled={!hasVariant}
                className={`relative flex items-center justify-between px-5 py-4 border transition-all duration-200 cursor-pointer text-left
                  ${isSelected
                    ? 'bg-[#FAF5F0] border-[#631D26]'
                    : hasVariant
                      ? 'bg-white border-[#C8C0B8] hover:border-[#1a1a1a]'
                      : 'bg-transparent border-[#E8E4E0] cursor-not-allowed'
                  }`}
              >
                <span className={`font-['Inter'] text-sm font-medium ${isSelected ? 'text-[#631D26]' : 'text-[#1a1a1a]'}`}>
                  {combo}
                </span>
                <span className={`font-['Inter'] text-[10px] tracking-[0.15em] uppercase ${isSelected ? 'text-[#631D26]' : 'text-gray-400'}`}>
                  {bundleCountLabel(combo)}
                </span>
                {!hasVariant && (
                  <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  // ── FRONTAL SET TAB ──
  const frontalSetUI = (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      {frontalSizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
              Frontal Size
            </span>
            <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
              {formatSizeLabel(frontalSize)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {frontalSizes.map((sizeVal) => {
              const isSelected = frontalSize === sizeVal;
              const hasVariant = isVariantAvailable('frontal-set', sizeVal, frontalSetCombo);
              return (
                <button
                  key={sizeVal}
                  onClick={() => {
                    if (!hasVariant) return;
                    setFrontalSize(sizeVal);
                    selectVariant('frontal-set', frontalSetCombo, sizeVal);
                  }}
                  disabled={!hasVariant}
                  className={`relative flex flex-col items-center justify-center py-4 border transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'bg-[#FAF5F0] border-[#631D26]'
                      : hasVariant
                        ? 'bg-white border-[#C8C0B8] hover:border-[#1a1a1a]'
                        : 'bg-transparent border-[#E8E4E0] cursor-not-allowed'
                    }`}
                >
                  <span className={`font-['Inter'] text-sm font-medium ${isSelected ? 'text-[#631D26]' : 'text-[#1a1a1a]'}`}>
                    {formatSizeLabel(sizeVal)}
                  </span>
                  {!hasVariant && (
                    <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                      <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bundle lengths */}
      {frontalSetCombos.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-[#631D26]">
              Bundle Lengths
            </span>
            <span className="font-['Inter'] text-sm text-[#1a1a1a] font-medium">
              {frontalSetCombo}
            </span>
          </div>
          {frontalSetCombos.map((combo) => {
            const isSelected = frontalSetCombo === combo;
            const hasVariant = isVariantAvailable('frontal-set', frontalSizes.length > 0 ? frontalSize : undefined, combo);
            return (
              <button
                key={combo}
                onClick={() => {
                  if (!hasVariant) return;
                  setFrontalSetCombo(combo);
                  selectVariant('frontal-set', combo, frontalSizes.length > 0 ? frontalSize : undefined);
                }}
                disabled={!hasVariant}
                className={`relative flex items-center justify-between px-5 py-4 border transition-all duration-200 cursor-pointer text-left
                  ${isSelected
                    ? 'bg-[#FAF5F0] border-[#631D26]'
                    : hasVariant
                      ? 'bg-white border-[#C8C0B8] hover:border-[#1a1a1a]'
                      : 'bg-transparent border-[#E8E4E0] cursor-not-allowed'
                  }`}
              >
                <span className={`font-['Inter'] text-sm font-medium ${isSelected ? 'text-[#631D26]' : 'text-[#1a1a1a]'}`}>
                  {combo}
                </span>
                <span className={`font-['Inter'] text-[10px] tracking-[0.15em] uppercase ${isSelected ? 'text-[#631D26]' : 'text-gray-400'}`}>
                  {bundleCountLabel(combo)}
                </span>
                {!hasVariant && (
                  <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <span className="absolute w-full h-px bg-gray-300 rotate-[-30deg]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      {tabHeader}
      {sectionHeader}
      <div className="py-4">
        {safeTab === 'single-bundle' && singleBundleUI}
        {safeTab === 'bundle-set' && bundleSetUI}
        {safeTab === 'closure-set' && closureSetUI}
        {safeTab === 'frontal-set' && frontalSetUI}
      </div>
    </div>
  );
};

export default ProductTypeTabs;