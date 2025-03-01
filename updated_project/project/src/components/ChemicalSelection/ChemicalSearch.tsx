import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChemicalStore } from '../../store/chemicalStore';

const ChemicalSearch = () => {
  const { searchTerm, setSearchTerm } = useChemicalStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chemicals..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>
    </motion.div>
  );
};

export default ChemicalSearch;