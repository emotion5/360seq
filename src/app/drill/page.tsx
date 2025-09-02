'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function DrillPage() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseX = useRef(0);
  const totalFrames = 36;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX.current;
        const sensitivity = 5;
        
        if (Math.abs(deltaX) > sensitivity) {
          const frameChange = deltaX > 0 ? 1 : -1;
          setCurrentFrame(prev => (prev + frameChange + totalFrames) % totalFrames);
          lastMouseX.current = e.clientX;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const frameChange = e.deltaY > 0 ? 1 : -1;
      setCurrentFrame(prev => (prev + frameChange + totalFrames) % totalFrames);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, totalFrames]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseX.current = e.clientX;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative">
        <div 
          className="cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
        >
          <Image
            src={`/drill-images/drill-${String(currentFrame + 1).padStart(2, '0')}.jpg`}
            alt={`Drill frame ${currentFrame + 1}`}
            width={400}
            height={400}
            priority
            className="rounded-lg shadow-lg"
            draggable={false}
          />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          Frame {currentFrame + 1} / {totalFrames}
        </div>
      </div>
    </div>
  );
}