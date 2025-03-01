import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Beaker } from 'lucide-react';
import { useChemicalStore } from '../../store/chemicalStore';
import { Chemical } from '../../types';

const ChemicalList = () => {
  const { chemicals, selectedChemicals, searchTerm, selectChemical } = useChemicalStore();

  const filteredChemicals = chemicals.filter(chemical =>
    chemical.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chemical.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderChemicalCard = (chemical: Chemical) => {
    const isSelected = selectedChemicals.some(c => c.id === chemical.id);

    return (
      <motion.div
        key={chemical.id}
        variants={item}
        className={`relative group p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-all ${
          isSelected ? 'ring-2 ring-cyan-500' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{chemical.name}</h3>
            <p className="text-sm text-gray-400">{chemical.formula}</p>
          </div>
          <button
            onClick={() => selectChemical(chemical)}
            disabled={isSelected}
            className={`p-2 rounded-lg transition-all ${
              isSelected
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-gray-700/50 hover:bg-cyan-500/20 hover:text-cyan-400'
            }`}
          >
            {isSelected ? <Beaker className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div key={`${chemical.id}-mw`}>
            <span className="text-gray-400">MW:</span>
            <span className="ml-2">{chemical.molecularWeight}</span>
          </div>
          <div key={`${chemical.id}-bp`}>
            <span className="text-gray-400">BP:</span>
            <span className="ml-2">{chemical.boilingPoint}°C</span>
          </div>
          <div key={`${chemical.id}-tc`}>
            <span className="text-gray-400">Tc:</span>
            <span className="ml-2">{chemical.criticalTemperature}°C</span>
          </div>
          <div key={`${chemical.id}-pc`}>
            <span className="text-gray-400">Pc:</span>
            <span className="ml-2">{chemical.criticalPressure} bar</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-lg transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-full" />
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
    >
      {filteredChemicals.map(chemical => (
        <React.Fragment key={chemical.id}>
          {renderChemicalCard(chemical)}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default ChemicalList;