"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "../utils";

interface CursorProps {
  size?: number;
}

export const Cursor: React.FC<CursorProps> = ({ size = 40 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousPos = useRef({ x: -size, y: -size });

  const [visible, setVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [position, setPosition] = useState({ x: -size, y: -size });

  const animate = () => {
    if (!cursorRef.current) return;

    const currentX = previousPos.current.x;
    const currentY = previousPos.current.y;
    const targetX = position.x - size / 2;
    const targetY = position.y - size / 2;

    const deltaX = (targetX - currentX) * 0.15; // Slower, smoother follow
    const deltaY = (targetY - currentY) * 0.15;

    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    previousPos.current = { x: newX, y: newY };
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, textarea, select, [style*="cursor: pointer"]')) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    document.body.style.cursor = "none";

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed pointer-events-none rounded-full z-50 transition-shadow duration-300 ease-in-out",
        isHoveringInteractive
          ? "shadow-[0_0_15px_rgba(255,93,36,0.7),_0_0_30px_rgba(255,93,36,0.4)]"
          : "shadow-none"
      )}
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
       <div
            className={cn(
                "w-full h-full rounded-full bg-white mix-blend-difference transition-transform duration-300 ease-in-out",
                isHoveringInteractive ? "scale-50" : "scale-100"
            )}
        />
    </div>
  );
};

export default Cursor;
