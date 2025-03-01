import React, { useState } from 'react';
import { EquipmentType } from '../../types';
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
  ChevronDown, 
  ChevronRight, 
  FlaskRound as Flask, 
  Cylinder, 
  Gauge, 
  Pipette, 
  Microscope, 
  Atom 
} from 'lucide-react';

interface EquipmentCategory {
  id: string;
  label: string;
  icon: JSX.Element;
  items: EquipmentType[];
}

const Sidebar: React.FC<{ categories: EquipmentCategory[] }> = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <button
              className="flex items-center justify-between w-full p-2 bg-gray-700 hover:bg-gray-600 rounded"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </span>
              {expandedCategories[category.id] ? <ChevronDown /> : <ChevronRight />}
            </button>
            {expandedCategories[category.id] && (
              <ul className="ml-4 mt-2">
                {category.items.map((item) => (
                  <li key={item.id} className="p-2 hover:bg-gray-700 rounded">
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
