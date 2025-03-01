import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useChemicalStore } from '../../store/chemicalStore';

const AddCustomChemical = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addCustomChemical } = useChemicalStore();
  const [formData, setFormData] = useState({
    name: '',
    formula: '',
    molecularWeight: 0,
    boilingPoint: 0,
    criticalTemperature: 0,
    criticalPressure: 0,
    state: 'liquid' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCustomChemical(formData);
    setIsOpen(false);
    setFormData({
      name: '',
      formula: '',
      molecularWeight: 0,
      boilingPoint: 0,
      criticalTemperature: 0,
      criticalPressure: 0,
      state: 'liquid'
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Custom Chemical
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl p-6 w-[500px]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Custom Chemical</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Chemical Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Chemical Formula
                </label>
                <input
                  type="text"
                  value={formData.formula}
                  onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Molecular Weight
                  </label>
                  <input
                    type="number"
                    value={formData.molecularWeight}
                    onChange={(e) => setFormData({ ...formData, molecularWeight: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Boiling Point (°C)
                  </label>
                  <input
                    type="number"
                    value={formData.boilingPoint}
                    onChange={(e) => setFormData({ ...formData, boilingPoint: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Critical Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={formData.criticalTemperature}
                    onChange={(e) => setFormData({ ...formData, criticalTemperature: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Critical Pressure (bar)
                  </label>
                  <input
                    type="number"
                    value={formData.criticalPressure}
                    onChange={(e) => setFormData({ ...formData, criticalPressure: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  State at Room Temperature
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value as 'solid' | 'liquid' | 'gas' })}
                  className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                >
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                  <option value="gas">Gas</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold"
                >
                  Add Chemical
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AddCustomChemical;