import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedList = forwardRef(({
  items = [],
  onItemSelect,
  onIndexChange,
  renderItem,
  showGradients = true,
  gradientColor = 'black',
  enableArrowNavigation = true,
  className = '',
  initialSelectedIndex = 0,
  selectedIndex: controlledIndex,
}, ref) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(initialSelectedIndex);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Swipe threshold
  const swipeThreshold = 50;

  // Sync with controlled index from parent
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex !== currentIndex) {
      const dir = controlledIndex > currentIndex ? 1 : -1;
      setDirection(dir);
      setCurrentIndex(controlledIndex);
    }
  }, [controlledIndex]);

  const goToIndex = useCallback((newIndex, dir = 0) => {
    if (newIndex < 0 || newIndex >= items.length) return;

    // Auto-determine direction if not specified
    if (dir === 0) {
      dir = newIndex > currentIndex ? 1 : -1;
    }

    setDirection(dir);
    setCurrentIndex(newIndex);

    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  }, [currentIndex, items.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      goToIndex(currentIndex + 1, 1);
    }
  }, [currentIndex, items.length, goToIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1, -1);
    }
  }, [currentIndex, goToIndex]);

  const handleItemClick = useCallback(() => {
    if (onItemSelect && items[currentIndex]) {
      onItemSelect(items[currentIndex], currentIndex);
    }
  }, [items, currentIndex, onItemSelect]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleItemClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableArrowNavigation, goNext, goPrev, handleItemClick]);

  // Drag/Swipe handlers
  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    const { offset, velocity } = info;

    // Determine swipe direction based on offset and velocity
    if (offset.x < -swipeThreshold || velocity.x < -500) {
      goNext();
    } else if (offset.x > swipeThreshold || velocity.x > 500) {
      goPrev();
    }
  }, [goNext, goPrev]);

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.85,
      zIndex: 0,
    }),
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Main Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: '450px' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onClick={() => !isDragging && handleItemClick()}
            className="cursor-grab active:cursor-grabbing w-full flex justify-center"
          >
            {renderItem ? (
              renderItem(items[currentIndex], currentIndex, true)
            ) : (
              <div className="bg-[#111] rounded-lg p-4">
                <p className="text-white m-0">{items[currentIndex]}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        disabled={currentIndex === 0}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-yellow-500/50 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${currentIndex === 0
          ? 'opacity-30 cursor-not-allowed'
          : 'opacity-100 hover:bg-yellow-500/20 hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
          }`}
        aria-label="Previous"
      >
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goNext}
        disabled={currentIndex === items.length - 1}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-yellow-500/50 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${currentIndex === items.length - 1
          ? 'opacity-30 cursor-not-allowed'
          : 'opacity-100 hover:bg-yellow-500/20 hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
          }`}
        aria-label="Next"
      >
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Side Gradients */}
      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 bottom-0 w-[100px] pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${gradientColor} 0%, transparent 100%)`
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-[100px] pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${gradientColor} 0%, transparent 100%)`
            }}
          />
        </>
      )}
    </div>
  );
});

export default AnimatedList;
