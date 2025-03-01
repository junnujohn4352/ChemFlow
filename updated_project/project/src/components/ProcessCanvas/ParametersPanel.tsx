import React from 'react';
import { X } from 'lucide-react';
import { Equipment } from '../../types';

interface ParametersPanelProps {
  equipment: Equipment;
  onClose: () => void;
  onUpdate: (updated: Equipment) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  equipment,
  onClose,
  onUpdate,
}) => {
  const handleParameterChange = (parameter: string, value: string | number) => {
    const updated = {
      ...equipment,
      parameters: {
        ...equipment.parameters,
        [parameter]: typeof value === 'string' ? value : Number(value),
      },
    };
    onUpdate(updated);
  };

  const handleNameChange = (name: string) => {
    const updated = {
      ...equipment,
      name
    };
    onUpdate(updated);
  };

  const renderParameters = () => {
    const parameters = equipment.parameters;
    return Object.entries(parameters).map(([key, value]) => (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          step={typeof value === 'number' ? 'any' : undefined}
        />
      </div>
    ));
  };

  return (
    <div className="w-96 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-4 w-full">
          <h3 className="text-lg font-semibold">Equipment Parameters</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Equipment Name
            </label>
            <input
              type="text"
              value={equipment.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Equipment Name"
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-lg transition-colors h-fit"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {renderParameters()}
      </div>
    </div>
  );
};

export default ParametersPanel;