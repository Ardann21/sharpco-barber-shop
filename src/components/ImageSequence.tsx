import { useRef, useMemo, useEffect } from "react";

const TOTAL_FRAMES = 192;

export const ImageSequence = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const images = useMemo(() => {
    const imgArray: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/photos/${i.toString().padStart(4, "0")}.jpg`;
      imgArray.push(img);
    }
    return imgArray;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
        const imgRatio = img.width / img.height;
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

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      if (img && img.complete) {
        draw();
      } else if (img) {
        img.onload = draw;
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
  }, [images, progress]);

  return (
    <div className="sticky top-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover grayscale-[0.3]" 
      />
      
      {/* Base Gradient Overlay (Top and Bottom) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a] z-[1]"></div>
      
      {/* Corner Specific Darkening */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,1)_0%,transparent_50%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,1)_0%,transparent_50%)]"></div>
      
      {/* Bottom Fade-out for Section Blend */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-[3]"></div>
      
      {/* Subtle Side Vignette */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
    </div>
  );
};
