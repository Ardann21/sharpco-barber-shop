import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 192;
const PRELOAD_BATCH_SIZE = 20;

export const ImageSequence = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const getImagePath = useCallback((index: number) => {
    const fileName = (index + 1).toString().padStart(4, "0");
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    return `${baseUrl}/photos/${fileName}.jpg`;
  }, []);

  // Initialize images array once
  useEffect(() => {
    if (imagesRef.current.length > 0) return;
    
    const imgArray: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      imgArray.push(img);
    }
    imagesRef.current = imgArray;

    // Start loading images in batches
    let isMounted = true;
    const loadBatch = async (start: number) => {
      const end = Math.min(start + PRELOAD_BATCH_SIZE, TOTAL_FRAMES);
      const promises = [];

      for (let i = start; i < end; i++) {
        const img = imagesRef.current[i];
        if (!img.src) {
          promises.push(new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`);
              resolve(null);
            };
            img.src = getImagePath(i);
          }));
        }
      }

      await Promise.all(promises);
      if (isMounted) {
        setLoadedCount(end);
        if (end < TOTAL_FRAMES) {
          setTimeout(() => loadBatch(end), 50);
        }
      }
    };

    loadBatch(0);
    return () => { isMounted = false; };
  }, [getImagePath]);

  // Main render logic
  const render = useCallback((val: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(val * TOTAL_FRAMES)
    );

    const img = imagesRef.current[Math.max(0, frameIndex)];
    if (!img) return;

    // IMPORTANT: If image doesn't have a src yet (preloader hasn't reached it), 
    // load it immediately to avoid freezing during scroll.
    if (!img.src) {
      img.src = getImagePath(Math.max(0, frameIndex));
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      const { width, height } = canvas;
      if (!img.complete || img.naturalWidth === 0) return;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) * 0.3; // Focus on the chair
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }
  }, [getImagePath]);

  // Handle resize and initial render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      render(progress.get());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    const unsubscribe = progress.on("change", (latest: number) => {
      render(latest);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [progress, render]);

  // Re-render when new images are loaded to update the view
  useEffect(() => {
    if (loadedCount > 0) {
      render(progress.get());
    }
  }, [loadedCount, progress, render]);

  return (
    <div className="sticky top-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'contrast(1.1) brightness(1.05) saturate(1.05)',
          imageRendering: '-webkit-optimize-contrast' as any
        }}
        className="object-cover"
      />

      <div className="absolute inset-0 z-[1] opacity-[0.25] pointer-events-none bg-[radial-gradient(#fff_0.5px,transparent_0.5px)] bg-[size:4px_4px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]/60 z-[2]"></div>
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[4]"></div>

      {loadedCount < TOTAL_FRAMES && (
        <div className="absolute bottom-10 right-10 z-[10] text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
          Loading Experience {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
};
