import { useMemo } from 'react';

interface HairDetailsProps {
  productType: string;
  tags: string[];
  title: string;
  descriptionHtml: string;
}

interface SpecItem {
  label: string;
  value: string;
}

const HairDetails = ({ productType, tags, title, descriptionHtml }: HairDetailsProps) => {
  const specs: SpecItem[] = useMemo(() => {
    const list: SpecItem[] = [];

    // Detect texture for texture-aware defaults
    const textureTag = tags.find((t) =>
      /kinky straight|kinky curly|bunmi wave|body wave|deep wave|loose wave|water wave|wave|wavy|straight|curly/i.test(t)
    );
    const texture = textureTag || title.match(/(Kinky Straight|Kinky Curly|Bunmi Wave|Body Wave|Deep Wave|Loose Wave|Water Wave|Wave|Wavy|Straight|Curly)/i)?.[1] || '';
    const isWave = /wave|wavy/i.test(texture);
    const isKinkyCurly = /kinky curly/i.test(texture);
    const isKinkyStraight = /kinky straight/i.test(texture);
    const isBunmiWave = /bunmi wave/i.test(texture);
    const isKinky = isKinkyCurly || isKinkyStraight;
    const isRaw = /\braw\b/i.test(title) ||
      tags.some((t) => /\braw\b/i.test(t)) ||
      /hair type:\s*raw/i.test(descriptionHtml);

    // Hair Type
    const hairTypeTag = tags.find((t) =>
      /virgin|human|remy|synthetic|raw/i.test(t)
    );
    if (isRaw) {
      list.push({ label: 'Hair Type', value: 'Raw Hair' });
    } else if (hairTypeTag) {
      list.push({ label: 'Hair Type', value: hairTypeTag });
    } else if (productType) {
      list.push({ label: 'Hair Type', value: productType });
    } else {
      list.push({ label: 'Hair Type', value: '100% Virgin Human Hair' });
    }

    // Texture
    if (isRaw) {
      const rawPattern = title.match(/raw\s+(straight|body wave|deep wave|loose wave|water wave|kinky straight|kinky curly|wave|curly)/i)?.[1] ?? 'straight';
      list.push({ label: 'Texture', value: `Raw ${rawPattern.replace(/\b\w/g, (c) => c.toUpperCase())}` });
    } else if (textureTag) {
      list.push({ label: 'Texture', value: textureTag });
    } else {
      const titleMatch = title.match(/(Kinky Straight|Kinky Curly|Bunmi Wave|Body Wave|Deep Wave|Loose Wave|Water Wave|Wave|Wavy|Straight|Curly)/i);
      if (titleMatch) {
        list.push({ label: 'Texture', value: titleMatch[1] });
      } else {
        list.push({ label: 'Texture', value: 'Natural' });
      }
    }

    // Blends With (Natural State)
    const naturalBlendTag = tags.find((t) =>
      /type\s*3[\-\–]?4[\w]*|type\s*3|type\s*4[\w]*|type\s*2[\-\–]?3/i.test(t)
    );
    if (isRaw) {
      list.push({ label: 'Blends With\n(Natural State)', value: 'Type 1-2' });
    } else if (naturalBlendTag) {
      const normalized = naturalBlendTag.replace(/^type/i, 'Type').replace(/(\d)[\-](\d)/, '$1–$2');
      list.push({ label: 'Blends With\n(Natural State)', value: normalized });
    } else {
      const naturalBlendMatch = descriptionHtml.match(/(Type\s*3[\-\–]?4[\w]*|Type\s*3|Type\s*4[\w]*|Type\s*2[\-\–]?3)/i);
      if (naturalBlendMatch) {
        const normalized = naturalBlendMatch[1].replace(/^type/i, 'Type');
        list.push({ label: 'Blends With\n(Natural State)', value: normalized });
      } else if (isKinkyCurly) {
        list.push({ label: 'Blends With\n(Natural State)', value: 'Type 3–4A' });
      } else if (isWave) {
        list.push({ label: 'Blends With\n(Natural State)', value: 'Type 3' });
      } else if (isKinkyStraight) {
        list.push({ label: 'Blends With\n(Natural State)', value: 'Type 3–4' });
      } else {
        list.push({ label: 'Blends With\n(Natural State)', value: 'Type 3' });
      }
    }

    // Blends With (Blown Out / Silk Pressed)
    const blownBlendTag = tags.find((t) =>
      /blown\s*out|silk\s*pressed|type\s*3[\-\–]?4[\w]*|type\s*4[\w]*|type\s*2[\-\–]?3/i.test(t)
    );
    if (isRaw) {
      list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: 'Type 3-4' });
    } else if (blownBlendTag) {
      const normalized = blownBlendTag.replace(/^type/i, 'Type').replace(/(\d)[\-](\d)/, '$1–$2');
      list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: normalized });
    } else {
      const blownBlendMatch = descriptionHtml.match(/(Type\s*3[\-\–]?4[\w]*|Type\s*4[\w]*|Type\s*2[\-\–]?3)/i);
      if (blownBlendMatch) {
        const normalized = blownBlendMatch[1].replace(/^type/i, 'Type');
        list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: normalized });
      } else if (isKinkyCurly) {
        list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: 'Type 4A' });
      } else if (isWave) {
        list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: 'Type 2–3' });
      } else if (isKinkyStraight) {
        list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: 'Type 3–4' });
      } else {
        list.push({ label: 'Blends With\n(Blown Out / Silk Pressed)', value: 'Type 2–3' });
      }
    }

    // feel
    if (isRaw) {
      list.push({ label: 'feel', value: 'Soft to the touch, naturally textured rather than silky' });
    } else if (isKinkyStraight) {
      list.push({ label: 'feel', value: 'Soft and lightweight with a natural coarseness that blends effortlessly' });
    } else if (isKinkyCurly) {
      list.push({ label: 'feel', value: 'Dense, coarse, and textured for maximum volume and natural curl definition' });
    } else if (isBunmiWave) {
      list.push({ label: 'feel', value: 'Dense and naturally textured' });
    } else {
      const reusableTag = tags.find((t) =>
        /reusable|multiple\s*installs/i.test(t)
      );
      list.push({ label: 'feel', value: reusableTag || 'Yes, multiple installs' });
    }

    // Install Method
    list.push({ label: 'Install Method', value: isRaw ? 'Sew-In, Quick Weave, Ponytail, Flip-over' : 'Sew-in, Quick Weave, Ponytail, Flip-over' });

    return list;
  }, [productType, tags, title, descriptionHtml]);

  return (
    <div className="bg-[#F5F0EB] px-5 sm:px-6 py-6">
      <h3 className="font-['Inter'] text-[9px] tracking-[0.35em] uppercase text-gray-400 mb-5">
        Hair Details
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {specs.map((spec) => (
          <div key={spec.label} className="flex flex-col gap-1">
            <span className="font-['Inter'] text-[9px] tracking-[0.25em] uppercase text-gray-400 whitespace-pre-line">
              {spec.label}
            </span>
            <span className="font-['Inter'] text-[13px] text-[#1a1a1a] font-medium leading-snug">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HairDetails;