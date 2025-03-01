import React from 'react';
import { Play } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';

interface HomePageProps {
  onStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <div className="mb-8 relative">
            <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
              ChemFlow
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl -z-10" />
          </div>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            An interactive process simulator for chemical engineering. Design, analyze, 
            and optimize chemical processes with real-time visualization and calculations.
          </p>

          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="flex items-center gap-2">
              Get Started
              <Play className="w-5 h-5" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-4xl">
          {[
            { title: 'Interactive Design', description: 'Drag & drop equipment units to create process flows' },
            { title: 'Real-time Analysis', description: 'Instant calculations and visualizations of process parameters' },
            { title: 'Comprehensive Tools', description: 'Full suite of chemical engineering calculations and analysis' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
            >
              <h3 className="text-lg font-semibold mb-2 text-cyan-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;