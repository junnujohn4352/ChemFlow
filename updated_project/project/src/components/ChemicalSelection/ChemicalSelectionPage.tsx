import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ChemicalSearch from './ChemicalSearch';
import ChemicalList from './ChemicalList';
import AddCustomChemical from './AddCustomChemical';
import ThermodynamicModelSelection from './ThermodynamicModelSelection';
import { useChemicalStore } from '../../store/chemicalStore';
import { useProcessStore } from '../../store/processStore';

interface ChemicalSelectionPageProps {
  onNext: () => void;
}

const ChemicalSelectionPage: React.FC<ChemicalSelectionPageProps> = ({ onNext }) => {
  const { selectedChemicals, fetchChemicals } = useChemicalStore();
  const { selectedModel } = useProcessStore();

  React.useEffect(() => {
    fetchChemicals();
  }, [fetchChemicals]);

  const canProceed = selectedChemicals.length >= 2 && selectedModel !== null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Setup Your Process</h1>
            <p className="text-gray-400">
              Select at least two chemicals and a thermodynamic model to begin your simulation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Chemical Selection</h2>
                <ChemicalSearch />
                <ChemicalList />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Thermodynamic Model</h2>
                <ThermodynamicModelSelection />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold mb-4">Selected Chemicals</h3>
                {selectedChemicals.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No chemicals selected yet. Select at least two chemicals to proceed.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedChemicals.map(chemical => (
                      <div
                        key={chemical.id}
                        className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{chemical.name}</p>
                          <p className="text-sm text-gray-400">{chemical.formula}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <AddCustomChemical />

              <button
                onClick={onNext}
                disabled={!canProceed}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue to Process Design
                <ArrowRight className="w-5 h-5" />
              </button>

              {!canProceed && (
                <p className="text-sm text-gray-400 text-center">
                  {selectedChemicals.length < 2 
                    ? "Select at least two chemicals to proceed" 
                    : "Select a thermodynamic model to proceed"}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChemicalSelectionPage;