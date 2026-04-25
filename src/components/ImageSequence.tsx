import { useRef, useMemo, useEffect, useState } from "react";

const TOTAL_FRAMES = 192;
const PRELOAD_BATCH_SIZE = 20;

export const ImageSequence = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const images = useMemo(() => {
    const imgArray: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      imgArray.push(img);
    }
    return imgArray;
  }, []);

  useEffect(() => {
    // Load images progressively to avoid flooding the network
    let isMounted = true;

    const loadBatch = async (start: number) => {
      const end = Math.min(start + PRELOAD_BATCH_SIZE, TOTAL_FRAMES);
      const promises = [];

      for (let i = start; i < end; i++) {
        const img = images[i];
        promises.push(new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
          img.src = `/photos/${(i + 1).toString().padStart(4, "0")}.jpg`;
        }));
      }

      await Promise.all(promises);
      if (isMounted) {
        setLoadedCount(end);
        if (end < TOTAL_FRAMES) {
          // Small delay before next batch to prioritize UI responsiveness
          setTimeout(() => loadBatch(end), 50);
        }
      }
    };

    loadBatch(0);

    return () => {
      isMounted = false;
    };
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Performance optimization
    if (!ctx) return;

    const render = (val: number) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(val * TOTAL_FRAMES)
      );

      const img = images[Math.max(0, frameIndex)];

      const draw = () => {
        if (!canvas || !ctx) return;
        const { width, height } = canvas;

        // Ensure image is loaded before drawing
        if (!img.complete || img.naturalWidth === 0) return;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawHeight = height;
          drawWidth = height * imgRatio;
          // Shift focus to the left (30%) instead of center (50%) to keep the chair in view
          offsetX = (width - drawWidth) * 0.3;
          offsetY = 0;
        } else {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      if (img && img.complete) {
        draw();
      } else if (img) {
        img.onload = draw;
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        render(progress.get());
      }, 100);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const unsubscribe = progress.on("change", (latest: number) => {
      render(latest);
    });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [images, progress, loadedCount]);

  return (
    <div className="sticky top-0 w-full h-[100dvh] z-0 pointer-events-none overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'contrast(1.1) brightness(1.05) saturate(1.05)', // Boosted for clarity
          imageRendering: '-webkit-optimize-contrast' as any
        }}
        className="object-cover"
      />

      {/* Technical Dot Grid to mask compression artifacts */}
      <div className="absolute inset-0 z-[1] opacity-[0.25] pointer-events-none bg-[radial-gradient(#fff_0.5px,transparent_0.5px)] bg-[size:4px_4px]"></div>

      {/* Reduced Overlays for better clarity */}
      {/* Top and Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]/60 z-[2]"></div>

      {/* Very Subtle Side Vignette */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      {/* Bottom Blend Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[4]"></div>

      {/* Loading Indicator for Mobile */}
      {loadedCount < TOTAL_FRAMES && (
        <div className="absolute bottom-10 right-10 z-[10] text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
          Loading Experience {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
};
