import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  renderItem,
  showGradients = true,
  gradientColor = 'black',
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = false,
  initialSelectedIndex = -1,
  maxHeight = '450px'
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemMouseEnter = useCallback(index => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item, index) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect]
  );

  const handleScroll = useCallback(e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = e => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 0;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative w-[90vw] px-12 py-2 mx-atuo top-2 left-1/2 -translate-x-1/2 overflow-hidden ${className}`}>
      <div
        ref={listRef}
        className={`overflow-y-auto ${displayScrollbar
          ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-yellow-500/20 [&::-webkit-scrollbar-thumb]:rounded-[4px]'
          : '[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]'
          }`}
        onScroll={handleScroll}
        style={{
          maxHeight,
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          scrollbarColor: displayScrollbar ? 'rgba(255, 215, 0, 0.2) transparent' : 'none'
        }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <AnimatedItem
              delay={0.1}
              index={index}
              onMouseEnter={() => handleItemMouseEnter(index)}
              onClick={() => handleItemClick(item, index)}
            >
              {renderItem ? (
                renderItem(item, index, selectedIndex === index)
              ) : (
                <div className={`bg-[#111] rounded-lg ${selectedIndex === index ? 'bg-[#222]' : ''} ${itemClassName}`}>
                  <p className="text-white m-0">{item}</p>
                </div>
              )}
            </AnimatedItem>
          </div>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none transition-opacity duration-300 ease"
            style={{
              opacity: topGradientOpacity,
              background: `linear-gradient(to bottom, ${gradientColor} 0%, transparent 100%)`
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none transition-opacity duration-300 ease"
            style={{
              opacity: bottomGradientOpacity,
              background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)`
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
