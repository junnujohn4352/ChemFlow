import React from 'react';
import { Beaker } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-3">
            <Beaker className="w-6 h-6 text-cyan-400" />
            <span className="font-semibold text-xl">ChemFlow</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;