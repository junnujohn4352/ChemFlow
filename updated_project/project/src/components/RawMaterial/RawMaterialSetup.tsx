import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useChemicalStore } from '../../store/chemicalStore';
import { useProcessStore } from '../../store/processStore';

interface RawMaterialSetupProps {
  onNext: () => void;
}

const RawMaterialSetup: React.FC<RawMaterialSetupProps> = ({ onNext }) => {
  const { selectedChemicals } = useChemicalStore();
  const { rawMaterials, addRawMaterial, updateRawMaterial } = useProcessStore();

  const handleParameterChange = (chemicalId: string, parameter: string, value: number) => {
    updateRawMaterial(chemicalId, { [parameter]: value });
  };

  React.useEffect(() => {
    // Initialize raw materials for selected chemicals if not already done
    selectedChemicals.forEach(chemical => {
      if (!rawMaterials.find(rm => rm.chemicalId === chemical.id)) {
        addRawMaterial({
          chemicalId: chemical.id,
          moleFraction: 0,
          massFlow: 0,
          temperature: 25,
          pressure: 1
        });
      }
    });
  }, [selectedChemicals, rawMaterials, addRawMaterial]);

  const totalMoleFraction = rawMaterials.reduce((sum, rm) => sum + rm.moleFraction, 0);
  const isValid = Math.abs(totalMoleFraction - 1) < 0.0001;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Raw Material Setup</h1>
            <p className="text-gray-400">
              Define the composition and conditions of your raw materials.
              The sum of mole fractions should equal 1.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
            <div className="space-y-6">
              {selectedChemicals.map(chemical => {
                const rawMaterial = rawMaterials.find(rm => rm.chemicalId === chemical.id);
                if (!rawMaterial) return null;

                return (
                  <div key={chemical.id} className="space-y-4">
                    <h3 className="text-lg font-semibold">{chemical.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Mole Fraction
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="1"
                          step="0.01"
                          value={rawMaterial.moleFraction}
                          onChange={(e) => handleParameterChange(
                            chemical.id,
                            'moleFraction',
                            Number(e.target.value)
                          )}
                          className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Mass Flow (kg/h)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={rawMaterial.massFlow}
                          onChange={(e) => handleParameterChange(
                            chemical.id,
                            'massFlow',
                            Number(e.target.value)
                          )}
                          className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Temperature (°C)
                        </label>
                        <input
                          type="number"
                          value={rawMaterial.temperature}
                          onChange={(e) => handleParameterChange(
                            chemical.id,
                            'temperature',
                            Number(e.target.value)
                          )}
                          className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Pressure (bar)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={rawMaterial.pressure}
                          onChange={(e) => handleParameterChange(
                            chemical.id,
                            'pressure',
                            Number(e.target.value)
                          )}
                          className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm">
                  Total Mole Fraction: 
                  <span className={totalMoleFraction === 1 ? 'text-green-400' : 'text-red-400'}>
                    {' '}{totalMoleFraction.toFixed(4)}
                  </span>
                </p>
                {!isValid && (
                  <p className="text-sm text-red-400 mt-1">
                    The sum of mole fractions must equal 1
                  </p>
                )}
              </div>
              <button
                onClick={onNext}
                disabled={!isValid}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue to Simulation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RawMaterialSetup;