import { useEffect, useRef, useState } from "react";

function ImageGallery({
  images = [],
  columns = 3,
  cellSize = 200,
  gap = 16,
  height,
  rootMargin = 100,
}) {
  const [loaded, setLoaded] = useState({});
  const imgRefs = useRef([]);
  const containerRef = useRef(null);

  const cols = Math.min(5, Math.max(1, Math.round(columns)));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = imgRefs.current.indexOf(entry.target);
            setLoaded((prev) => {
              const next = { ...prev };
              next[i] = true;

              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: height ? containerRef.current : null,
        rootMargin: `${rootMargin}px`,
      },
    );

    imgRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [images, height, rootMargin]);

  return (
    <div
      ref={containerRef}
      style={height ? { height, overflowY: "auto" } : undefined}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridAutoRows: `${cellSize}px`,
          gap,
        }}
      >
        {images.map((url, i) => (
          <img
            key={i}
            ref={(el) => (imgRefs.current[i] = el)}
            src={loaded[i] ? url : undefined}
            alt={`Image ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
