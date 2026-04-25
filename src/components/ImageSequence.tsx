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
          offsetX = (width - drawWidth) / 2;
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
    <div className="sticky top-0 w-full h-screen h-[100dvh] z-0 pointer-events-none overflow-hidden bg-black">
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%' }}
        className="object-cover grayscale-[0.3]" 
      />
      
      {/* Base Gradient Overlay (Top and Bottom) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a] z-[1]"></div>
      
      {/* Corner Specific Darkening */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,1)_0%,transparent_50%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,1)_0%,transparent_50%)]"></div>
      
      {/* Bottom Fade-out for Section Blend */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-[3]"></div>
      
      {/* Subtle Side Vignette */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

      {/* Loading Indicator for Mobile */}
      {loadedCount < TOTAL_FRAMES && (
        <div className="absolute bottom-10 right-10 z-[10] text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
          Loading Experience {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
};
