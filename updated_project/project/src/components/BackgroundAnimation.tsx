import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900" />
    </div>
  );
}

export default BackgroundAnimation;