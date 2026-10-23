import { useRef, useEffect } from 'react';

interface VideoSource {
  url: string;
  mimeType: string;
}

interface MediaItem {
  type: 'image' | 'video' | 'external_video';
  url: string;
  altText: string;
  previewUrl: string;
  mimeType?: string;
  sources?: VideoSource[];
}

interface ProductImage {
  url: string;
  altText: string;
}

interface ImageGalleryProps {
  images: ProductImage[];
  media?: MediaItem[];
  title: string;
}

const MediaSlide = ({
  item,
  title,
  className,
}: {
  item: MediaItem;
  title: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== 'video') return;
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(vid);

    return () => {
      observer.disconnect();
    };
  }, [item.type, item.url, item.sources]);

  if (item.type === 'video') {
    const sources: VideoSource[] = item.sources?.length
      ? item.sources
      : [{ url: item.url, mimeType: item.mimeType || 'video/mp4' }];

    return (
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          poster={item.previewUrl || undefined}
        >
          {sources.map((s, i) => (
            <source key={i} src={s.url} type={s.mimeType} />
          ))}
        </video>
      </div>
    );
  }

  if (item.type === 'external_video') {
    return (
      <iframe
        src={item.url}
        title={item.altText || title}
        className={className}
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ border: 'none', width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <img
      src={item.url}
      alt={item.altText || title}
      className={className}
      style={{ objectFit: 'cover', objectPosition: 'top' }}
    />
  );
};

const ImageGallery = ({ images, media, title }: ImageGalleryProps) => {
  const items: MediaItem[] = media?.length
    ? media
    : images.map((img) => ({
        type: 'image',
        url: img.url,
        altText: img.altText,
        previewUrl: img.url,
      }));

  if (!items.length) return null;

  const videoCount = items.filter((m) => m.type === 'video' || m.type === 'external_video').length;
  const totalCount = items.length;

  return (
    <>
      {/* ── DESKTOP: vertical scroll stack ── */}
      <div className="hidden lg:flex flex-col gap-1 p-2 overflow-y-auto h-full scroll-smooth">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative w-full overflow-hidden bg-[#F7F4F1] group flex-shrink-0"
            style={{ aspectRatio: '4/5' }}
          >
            {item.type === 'video' ? (
              <MediaSlide item={item} title={title} />
            ) : (
              <MediaSlide
                item={item}
                title={title}
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            )}

            {i === 0 && totalCount > 1 && (
              <div className="absolute bottom-3 right-3 font-['Inter'] text-[10px] tracking-[0.15em] text-white/70 bg-black/20 px-2 py-0.5 flex items-center gap-1.5 z-10">
                {videoCount > 0 && (
                  <span className="flex items-center gap-1">
                    <i className="ri-play-circle-line text-[11px]" />
                    {videoCount} video{videoCount > 1 ? 's' : ''}
                  </span>
                )}
                {videoCount > 0 && <span>·</span>}
                <span>{totalCount - videoCount} photo{totalCount - videoCount !== 1 ? 's' : ''}</span>
              </div>
            )}

            {(item.type === 'video' || item.type === 'external_video') && (
              <div className="absolute top-3 left-3 bg-black/30 text-white/80 px-2 py-0.5 font-['Inter'] text-[9px] tracking-[0.15em] uppercase flex items-center gap-1 z-10">
                <i className="ri-play-fill text-[10px]" />
                Video
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── MOBILE: horizontal swipe ── */}
      <div
        className="lg:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full snap-center overflow-hidden bg-[#F7F4F1] relative"
            style={{ aspectRatio: '4/5' }}
          >
            {item.type === 'video' ? (
              <MediaSlide item={item} title={title} />
            ) : (
              <MediaSlide
                item={item}
                title={title}
                className="absolute inset-0 w-full h-full"
              />
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {items.map((_, di) => (
                <span
                  key={di}
                  className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${di === i ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/25'}`}
                />
              ))}
            </div>

            {(item.type === 'video' || item.type === 'external_video') && (
              <div className="absolute top-3 left-3 bg-black/30 text-white/80 px-2 py-0.5 font-['Inter'] text-[9px] tracking-[0.15em] uppercase flex items-center gap-1 z-10">
                <i className="ri-play-fill text-[10px]" />
                Video
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;