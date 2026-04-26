import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 192;
const PRELOAD_BATCH_SIZE = 20;

export const ImageSequence = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const getImagePath = useCallback((index: number) => {
    const fileName = (index + 1).toString().padStart(4, "0");
    const baseUrl = ((import.meta as any).env?.BASE_URL || "").replace(/\/$/, "");
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
            img.onload = async () => {
              try {
                if (img.decode) await img.decode();
              } catch (e) {
                // Silently handle decode errors
              }
              resolve(null);
            };
            img.onerror = () => resolve(null);
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

  // Main render logic with frame cross-fading
  const render = useCallback((val: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Calculate fractional frame index for cross-fading
    const floatIndex = val * (TOTAL_FRAMES - 1);
    const frame1 = Math.floor(floatIndex);
    const frame2 = Math.min(TOTAL_FRAMES - 1, frame1 + 1);
    const ratio = floatIndex - frame1;

    const img1 = imagesRef.current[frame1];
    const img2 = imagesRef.current[frame2];

    if (!img1) return;

    // Ensure images have sources
    if (!img1.src) img1.src = getImagePath(frame1);
    if (img2 && !img2.src) img2.src = getImagePath(frame2);

    const drawFrame = (img: HTMLImageElement, opacity: number = 1) => {
      if (!img.complete || img.naturalWidth === 0) return false;
      
      const { width, height } = canvas;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) * 0.3;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      return true;
    };

    // Draw frame 1 (base)
    const success1 = drawFrame(img1, 1);
    
    // Draw frame 2 (overlay) with ratio opacity for smooth cross-fade
    if (success1 && ratio > 0.05 && img2) {
      drawFrame(img2, ratio);
    }

    // If images aren't ready, set onload to re-trigger render
    if (!img1.complete) img1.onload = () => render(val);
    if (img2 && !img2.complete) img2.onload = () => render(val);
    
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
