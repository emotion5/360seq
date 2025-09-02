'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Box00Page() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const totalFrames = 4;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const sensitivity = 5;
        
        const totalDelta = deltaX + deltaY;
        if (Math.abs(totalDelta) > sensitivity) {
          const frameChange = totalDelta > 0 ? 1 : -1;
          setCurrentFrame((prev: number) => (prev + frameChange + totalFrames) % totalFrames);
          lastMouseX.current = e.clientX;
          lastMouseY.current = e.clientY;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const frameChange = e.deltaY > 0 ? 1 : -1;
      setCurrentFrame((prev: number) => (prev + frameChange + totalFrames) % totalFrames);
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
    lastMouseY.current = e.clientY;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative">
        <div 
          className="cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
        >
          <Image
            src={`/box00/box-${String(currentFrame + 1).padStart(3, '0')}.jpeg`}
            alt={`Box frame ${currentFrame + 1}`}
            width={500}
            height={500}
            priority
            className="rounded-lg shadow-2xl"
            draggable={false}
          />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-900 bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium">
          Frame {currentFrame + 1} / {totalFrames}
        </div>
        <div className="absolute top-4 left-4 text-indigo-900 text-lg font-bold bg-white bg-opacity-80 px-3 py-1 rounded-lg">
          Box 360°
        </div>
        <div className="absolute top-4 right-4 text-indigo-900 text-sm bg-white bg-opacity-80 px-3 py-1 rounded-lg">
          Drag or Wheel to rotate
        </div>
      </div>
    </div>
  );
}