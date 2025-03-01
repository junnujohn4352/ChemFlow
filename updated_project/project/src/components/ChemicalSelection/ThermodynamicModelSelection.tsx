import React from 'react';
import { motion } from 'framer-motion';
import { useProcessStore } from '../../store/processStore';
import { ThermodynamicModel } from '../../types';

const thermodynamicModels: ThermodynamicModel[] = [
  {
    id: 'peng-robinson',
    name: 'Peng-Robinson',
    description: 'Best for non-polar and slightly polar components at high pressure',
    applicableFor: {
      polar: false,
      nonPolar: true,
      pressure: 'high',
      phase: ['vapor', 'liquid']
    }
  },
  {
    id: 'nrtl',
    name: 'NRTL',
    description: 'Suitable for highly non-ideal liquid mixtures',
    applicableFor: {
      polar: true,
      nonPolar: true,
      pressure: 'low',
      phase: ['liquid']
    }
  },
  {
    id: 'uniquac',
    name: 'UNIQUAC',
    description: 'Ideal for liquid-liquid and vapor-liquid equilibria',
    applicableFor: {
      polar: true,
      nonPolar: true,
      pressure: 'medium',
      phase: ['vapor', 'liquid']
    }
  },
  {
    id: 'wilson',
    name: 'Wilson',
    description: 'Suitable for strongly non-ideal liquid mixtures',
    applicableFor: {
      polar: true,
      nonPolar: false,
      pressure: 'low',
      phase: ['liquid']
    }
  },
  {
    id: 'ideal-gas',
    name: 'Ideal Gas',
    description: 'Assumes ideal behavior for gases under low pressure conditions',
    applicableFor: {
      polar: true,
      nonPolar: true,
      pressure: 'low',
      phase: ['vapor']
    }
  }
];

const ThermodynamicModelSelection = () => {
  const { selectedModel, setSelectedModel } = useProcessStore();

  return (
    <div className="grid grid-cols-1 gap-4">
      {thermodynamicModels.map((model) => (
        <motion.button
          key={model.id}
          onClick={() => setSelectedModel(model)}
          className={`text-left p-4 rounded-lg border transition-all ${
            selectedModel?.id === model.id
              ? 'bg-cyan-500/20 border-cyan-500'
              : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{model.name}</h3>
            <div className="flex gap-2">
              {model.applicableFor.phase.map(phase => (
                <span
                  key={phase}
                  className="text-xs px-2 py-1 rounded-full bg-gray-700/50"
                >
                  {phase}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400">{model.description}</p>
          <div className="mt-2 flex gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${
              model.applicableFor.pressure === 'high'
                ? 'bg-red-500/20 text-red-400'
                : model.applicableFor.pressure === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {model.applicableFor.pressure} pressure
            </span>
            {model.applicableFor.polar && (
              <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                polar
              </span>
            )}
            {model.applicableFor.nonPolar && (
              <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                non-polar
              </span>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ThermodynamicModelSelection;