interface ModelLineProps {
  title: string;
  tags: string[];
  descriptionHtml: string;
}

const ModelLine = ({ title, tags, descriptionHtml }: ModelLineProps) => {
  // Detect texture for texture-aware defaults
  const textureTag = tags.find((t) =>
    /kinky straight|kinky curly|body wave|deep wave|loose wave|water wave|wave|wavy|straight|curly/i.test(t)
  );
  const texture = textureTag
    || title.match(/(Kinky Straight|Kinky Curly|Body Wave|Deep Wave|Loose Wave|Water Wave|Wave|Wavy|Straight|Curly)/i)?.[1]
    || '';
  const isKinkyStraight = /kinky straight/i.test(texture);
  const isKinkyCurly = /kinky curly/i.test(texture);
  const isWave = /wave|wavy/i.test(texture);
  const isRawStraight = /raw straight/i.test(`${title} ${texture} ${tags.join(' ')}`);

  // Extract length from title, tags, or description
  // Avoid matching prices like $82 by requiring the number to be preceded by whitespace or start of string
  const lengthMatch = title.match(/(?:^|\s)(\d{2})\"?\s*(Inch|inches|\"|\')/i);
  const extractedLength = lengthMatch
    ? `${lengthMatch[1]}"`
    : tags.find((t) => /(?:^|\s)\d{2}\s*(?:\"|inch|inches)/i.test(t))
    || descriptionHtml.match(/(?:^|\s)(\d{2})\s*(?:\"|inch|inches)/i)?.[1]
    || null;

  // Default values per texture
  const defaultLength = isKinkyStraight ? '22"' : isKinkyCurly ? '20"' : isWave ? '18"' : '22"';
  const length = extractedLength || defaultLength;

  const bundles = isWave ? '2 bundles' : '3 bundles';
  const closure = isWave ? '13×4 frontal' : '7×7 closure';
  const layers = isKinkyStraight
    ? 'no layers'
    : isWave
      ? 'pressed and curled with layers'
      : 'light layers';

  // Force exact text per texture to bypass any extraction issues
  const lineText = isRawStraight
    ? 'Model is wearing 4 1/2 bundles, 24, 26, 26, 26 and 4x4 Closure.'
    : isWave
      ? 'Model is wearing 2 bundles of 18" with a 13×4 frontal, pressed and curled with layers'
      : `Model is wearing ${bundles} of ${length} with a ${closure}, ${layers}`;

  return (
    <div className="px-5 sm:px-6">
      <p className="font-['Inter'] text-[13px] text-[#1a1a1a] leading-relaxed">
        {lineText}
      </p>
    </div>
  );
};

export default ModelLine;