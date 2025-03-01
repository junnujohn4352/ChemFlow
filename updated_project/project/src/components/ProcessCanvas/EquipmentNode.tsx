import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Beaker,
  Waves,
  CircleDot,
  GitMerge,
  TestTubes,
  Container,
  Filter,
  Snowflake,
  Wind,
  Combine,
  Droplets,
  Split,
  GripHorizontal,
} from 'lucide-react';
import { EquipmentType } from '../../types';

const icons: Record<string, React.ElementType> = {
  pfr: Beaker,
  cstr: Beaker,
  batch_reactor: Beaker,
  shell_and_tube: Waves,
  plate: Waves,
  air_cooled: Waves,
  distillation: TestTubes,
  flash: Split,
  absorber: TestTubes,
  extractor: TestTubes,
  cyclone: Wind,
  crystallizer: Snowflake,
  pump: CircleDot,
  mixer: GitMerge,
  splitter: Split,
  compressor: Combine,
  tank: Container,
  filter: Filter,
  dryer: Wind,
  evaporator: Droplets,
};

interface EquipmentNodeProps {
  data: {
    type: EquipmentType;
    name: string;
    parameters: {
      temperature: number;
      pressure: number;
      flowRate: number;
    };
  };
}

const EquipmentNode: React.FC<EquipmentNodeProps> = ({ data }) => {
  const Icon = icons[data.type] || Beaker; // Fallback to Beaker if type not found

  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-cyan-400"
      />
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 min-w-[160px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm">{data.name}</span>
          </div>
          <div className="drag-handle cursor-move">
            <GripHorizontal className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-1 text-xs text-gray-400">
          <div className="flex justify-between">
            <span>Temp:</span>
            <span>{data.parameters.temperature}°C</span>
          </div>
          <div className="flex justify-between">
            <span>Press:</span>
            <span>{data.parameters.pressure} bar</span>
          </div>
          <div className="flex justify-between">
            <span>Flow:</span>
            <span>{data.parameters.flowRate} m³/h</span>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-cyan-400"
      />
    </div>
  );
};

export default memo(EquipmentNode);