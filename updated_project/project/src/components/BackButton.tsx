import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
};

export default BackButton;