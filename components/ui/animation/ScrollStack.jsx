import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-screen box-border origin-top overflow-hidden ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 0,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = 0,
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.scroll-stack-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      // Create a timeline for each card's pinning and scaling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: `top ${stackPosition}+=${i * itemStackDistance}`,
          endTrigger: containerRef.current,
          end: 'bottom center',
          pin: true,
          pinSpacing: false,
          scrub: true,
          // markers: true, // Uncomment for debugging
        }
      });

      // Scale down previous cards as this one pins
      if (i > 0) {
        cards.slice(0, i).forEach((prevCard, j) => {
          gsap.to(prevCard, {
            scale: 1 - (i - j) * itemScale,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: `top ${stackPosition}+=${i * itemStackDistance}`,
              end: `top ${stackPosition}`,
              scrub: true,
            }
          })
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div className="scroll-stack-inner">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
