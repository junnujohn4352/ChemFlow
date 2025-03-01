import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialPanelProps {
  onClose: () => void;
}

const tutorials = [
  {
    title: "Getting Started",
    steps: [
      "Welcome to ChemFlow! This tutorial will guide you through creating your first process simulation.",
      "The left sidebar contains all available equipment units that you can use in your simulation.",
      "Simply drag and drop equipment onto the canvas to start building your process.",
    ]
  },
  {
    title: "Connecting Equipment",
    steps: [
      "Connect equipment by clicking and dragging from one unit's output (right side) to another unit's input (left side).",
      "Connected lines represent process streams and will show flow animations.",
      "You can have multiple connections to and from equipment units.",
    ]
  },
  {
    title: "Adjusting Parameters",
    steps: [
      "Click on any equipment unit to open the parameters panel.",
      "Use the sliders to adjust temperature, pressure, and flow rate.",
      "Changes in parameters will affect the process calculations and analysis.",
    ]
  },
  {
    title: "Process Analysis",
    steps: [
      "Click 'View Analysis' to see detailed calculations and graphs.",
      "The analysis includes mass balance, energy balance, VLE calculations, and more.",
      "Use this data to optimize your process design and understand system behavior.",
    ]
  },
  {
    title: "Best Practices",
    steps: [
      "Start with major process units first (reactors, separators).",
      "Add auxiliary equipment (pumps, heat exchangers) as needed.",
      "Ensure all streams are properly connected before running analysis.",
      "Verify that operating parameters are within realistic ranges.",
    ]
  }
];

const TutorialPanel: React.FC<TutorialPanelProps> = ({ onClose }) => {
  const [currentTutorial, setCurrentTutorial] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorial = tutorials[currentTutorial];
  const totalSteps = tutorial.steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentTutorial < tutorials.length - 1) {
      setCurrentTutorial(currentTutorial + 1);
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentTutorial > 0) {
      setCurrentTutorial(currentTutorial - 1);
      setCurrentStep(tutorials[currentTutorial - 1].steps.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl w-[600px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{tutorial.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 mb-6 min-h-[120px]">
          <p className="text-lg">{tutorial.steps[currentStep]}</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentTutorial === 0 && currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </div>

          <button
            onClick={nextStep}
            disabled={currentTutorial === tutorials.length - 1 && currentStep === totalSteps - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentTutorial === tutorials.length - 1 && currentStep === totalSteps - 1 ? (
              'Finish'
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPanel;