import {  useEffect, useState, useRef  } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const CursorDot = styled(motion.div)<{ $isHovering: boolean, $color: string }>`
  position: fixed;
  width: ${props => props.$isHovering ? '12px' : '8px'};
  height: ${props => props.$isHovering ? '12px' : '8px'};
  border-radius: 50%;
  background-color: ${props => props.$color};
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
  mix-blend-mode: difference;
  opacity: 0.7;
`;

const CursorRing = styled(motion.div)<{ $isHovering: boolean, $color: string }>`
  position: fixed;
  width: ${props => props.$isHovering ? '36px' : '30px'};
  height: ${props => props.$isHovering ? '36px' : '30px'};
  border-radius: 50%;
  border: 1px solid ${props => props.$color};
  transform: translate(-50%, -50%);
  z-index: 9998;
  pointer-events: none;
  opacity: 0.5;
`;

const TrailEffect = styled(motion.div)<{ $color: string }>`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  opacity: 0.2;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 0 8px ${props => props.$color};
`;

type TrailPoint = {
  x: number;
  y: number;
  id: number;
  opacity: number;
};

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState('var(--accent-cyan)');
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const trailId = useRef(0);

  // Update mouse position for cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      if (trailId.current % 3 === 0) { // Only add a trail every few movements
        setTrails(prev => [
          ...prev.slice(-20), // Keep only last 20 trail points
          { x: e.clientX, y: e.clientY, id: trailId.current, opacity: 1 }
        ]);
      }
      trailId.current++;
    };

    // Fade out trail points gradually
    const trailInterval = setInterval(() => {
      setTrails(prev => 
        prev.map(point => ({
          ...point,
          opacity: point.opacity - 0.05 > 0 ? point.opacity - 0.05 : 0
        })).filter(point => point.opacity > 0)
      );
    }, 50);

    // Check if cursor is hovering over links or buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
        setCursorColor('var(--accent-magenta)');
      } else {
        setIsHovering(false);
        setCursorColor('var(--accent-cyan)');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      clearInterval(trailInterval);
    };
  }, []);

  return (
    <CursorContainer>
      {trails.map(point => (
        <TrailEffect
          key={point.id}
          $color={cursorColor}
          initial={{ opacity: point.opacity }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x,
            top: point.y,
            opacity: point.opacity
          }}
        />
      ))}
      <CursorRing
        $isHovering={isHovering}
        $color={cursorColor}
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.1 : 1,
          transition: { type: 'spring', damping: 15 }
        }}
      />
      <CursorDot
        $isHovering={isHovering}
        $color={cursorColor}
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.2 : 1,
          transition: { type: 'spring', damping: 10 }
        }}
      />
    </CursorContainer>
  );
};

export default CustomCursor; 