import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, gradient }) => {
  return (
    <button className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/70">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
      
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
      
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient} rounded-b-xl transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-full`} />
    </button>
  );
}

export default DashboardCard;