import { useState, useMemo } from 'react';

interface ProductDescriptionProps {
  descriptionHtml: string;
  productType: string;
  tags: string[];
}

interface TabSection {
  id: string;
  label: string;
  html: string;
}

const descriptionClasses = `
  font-['Inter'] text-sm text-gray-500 leading-relaxed
  [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-500
  [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-3 [&_ul]:space-y-1.5
  [&_li]:text-sm [&_li]:text-gray-500 [&_li]:pl-4 [&_li]:relative
  [&_h1]:font-['Inter'] [&_h1]:text-xs [&_h1]:tracking-widest [&_h1]:uppercase [&_h1]:text-[#1a1a1a] [&_h1]:mb-3 [&_h1]:mt-5
  [&_h2]:font-['Inter'] [&_h2]:text-xs [&_h2]:tracking-widest [&_h2]:uppercase [&_h2]:text-[#1a1a1a] [&_h2]:mb-3 [&_h2]:mt-5
  [&_h3]:font-['Inter'] [&_h3]:text-xs [&_h3]:tracking-widest [&_h3]:uppercase [&_h3]:text-[#1a1a1a] [&_h3]:mb-3 [&_h3]:mt-5
  [&_h4]:font-['Inter'] [&_h4]:text-xs [&_h4]:tracking-widest [&_h4]:uppercase [&_h4]:text-[#1a1a1a] [&_h4]:mb-3 [&_h4]:mt-5
  [&_strong]:text-[#1a1a1a] [&_strong]:font-medium
`;

/**
 * Some products store their section labels as bold text inside a paragraph
 * (e.g. <p><strong>Hair Care</strong></p>) instead of real heading tags.
 * Convert those recognised labels into <h2> so they split into their own tabs
 * the same way products that use proper headings already do.
 */
const SECTION_LABEL_PATTERN =
  /<p[^>]*>\s*<(?:strong|b)[^>]*>\s*(Hair\s*Care|Haircare|Care\s*Guide|FAQ|Frequently\s*Asked\s*Questions)\s*<\/(?:strong|b)>\s*<\/p>/gi;

function normalizeSectionLabels(html: string): string {
  if (!html) return html;
  return html.replace(SECTION_LABEL_PATTERN, (_match, label: string) => `<h2>${label}</h2>`);
}

/**
 * Splits descriptionHtml into sections based on top-level h1–h6 headings.
 * The first section (id: 'description') contains everything before the first heading.
 * Each subsequent heading becomes its own tab.
 */
function buildSections(html: string): TabSection[] {
  if (!html) return [{ id: 'description', label: 'Description', html: '' }];

  const normalized = normalizeSectionLabels(html);

  // Split on every h1–h6 opening tag, keeping the delimiter
  const parts = normalized.split(/(?=<h[1-6][^>]*>)/i);

  const sections: TabSection[] = [];

  parts.forEach((part, idx) => {
    const headingMatch = part.match(/^<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i);

    if (idx === 0 || !headingMatch) {
      // Everything before the first heading → Description tab
      const trimmed = part.trim();
      if (idx === 0) {
        sections.push({
          id: 'description',
          label: 'Description',
          html: trimmed,
        });
      }
      return;
    }

    // Extract plain text from the heading for the tab label
    const rawLabel = headingMatch[2].replace(/<[^>]+>/g, '').trim();
    const label = rawLabel.length > 0 ? rawLabel : `Section ${sections.length}`;
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    sections.push({ id, label, html: part.trim() });
  });

  // Always ensure Description tab exists
  if (sections.length === 0 || sections[0].id !== 'description') {
    sections.unshift({ id: 'description', label: 'Description', html: normalized });
  }

  return sections;
}

const ProductDescription = ({ descriptionHtml }: ProductDescriptionProps) => {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen((prev) => (prev === id ? null : id));

  const sections = useMemo(() => buildSections(descriptionHtml), [descriptionHtml]);

  return (
    <div className="border-t border-[#EEEBE7]">
      {/* Horizontal tab buttons */}
      <div className="flex border-b border-[#EEEBE7]">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => toggle(section.id)}
            className={`flex-1 flex items-center justify-between py-5 cursor-pointer transition-colors duration-200
              ${idx !== 0 ? 'border-l border-[#EEEBE7]' : ''}
              ${open === section.id ? 'text-[#1a1a1a]' : 'text-gray-400 hover:text-[#1a1a1a]'}
              px-4 group`}
          >
            <span className="font-['Inter'] text-[11px] tracking-[0.25em] uppercase">
              {section.label}
            </span>
            <span className={`font-['Inter'] text-lg transition-transform duration-300 ${open === section.id ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
        ))}
      </div>

      {/* Collapsible content panel */}
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="overflow-y-auto max-h-[500px] py-8 border-b border-[#EEEBE7]">
          {sections.map((section) =>
            open === section.id ? (
              <div
                key={section.id}
                className={descriptionClasses}
                dangerouslySetInnerHTML={{
                  __html: section.html || '<p>No content available.</p>',
                }}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
