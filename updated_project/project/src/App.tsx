import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProcessCanvas from './components/ProcessCanvas/ProcessCanvas';
import BackgroundAnimation from './components/BackgroundAnimation';
import HomePage from './components/HomePage';
import ChemicalSelectionPage from './components/ChemicalSelection/ChemicalSelectionPage';

type WorkflowStep = 'home' | 'chemical-selection' | 'simulation';

function App() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('home');

  const renderStep = () => {
    switch (currentStep) {
      case 'home':
        return <HomePage onStart={() => setCurrentStep('chemical-selection')} />;
      case 'chemical-selection':
        return <ChemicalSelectionPage onNext={() => setCurrentStep('simulation')} />;
      case 'simulation':
        return (
          <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
            <BackgroundAnimation />
            <div className="relative z-10">
              <Navbar />
              <ProcessCanvas />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderStep();
}

export default App;