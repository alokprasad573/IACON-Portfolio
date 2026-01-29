const Layer = ({ children, index, className = "", isSticky = false }) => {
  return (
    <div className={`stack-layer relative bg-black w-full h-fit min-h-screen pointer-events-none ${isSticky ? 'sticky top-0 h-screen' : ''}`} style={{ zIndex: index }}>
      <div
        className={`scroll-layer relative w-full h-full min-h-screen flex items-center justify-center p-4 md:p-12 pointer-events-auto ${className}`}
      >
        <div className="w-full h-full max-w-[1600px] flex justify-center items-center accelerated p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layer