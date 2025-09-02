'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface SpinViewerProps {
  imagePath: string;
  totalFrames: number;
  imagePrefix: string;
  imageExtension: string;
  productName: string;
  frameDigits?: number;
}

export default function SpinViewer({ 
  imagePath, 
  totalFrames, 
  imagePrefix, 
  imageExtension,
  productName,
  frameDigits = 2
}: SpinViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const lastMouseX = useRef(0);
  const lastTouchX = useRef(0);

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

    const handleTouchMove = (e: TouchEvent) => {
      if (isTouching) {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouchX.current;
        const sensitivity = 5;
        
        if (Math.abs(deltaX) > sensitivity) {
          const frameChange = deltaX > 0 ? 1 : -1;
          setCurrentFrame(prev => (prev + frameChange + totalFrames) % totalFrames);
          lastTouchX.current = touch.clientX;
        }
      }
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
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

    if (isTouching) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, isTouching, totalFrames]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    const touch = e.touches[0];
    lastTouchX.current = touch.clientX;
  };

  const getImageSrc = () => {
    const frameNumber = currentFrame + 1;
    const paddedFrameNumber = String(frameNumber).padStart(frameDigits, '0');
    return `${imagePath}${imagePrefix}-${paddedFrameNumber}.${imageExtension}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative">
        <div 
          className="cursor-grab active:cursor-grabbing select-none touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Image
            src={getImageSrc()}
            alt={`${productName} frame ${currentFrame + 1}`}
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