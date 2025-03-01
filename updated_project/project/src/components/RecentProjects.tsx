import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Ethanol Production Process',
    lastModified: '2 hours ago',
    progress: 85,
  },
  {
    id: 2,
    name: 'Heat Exchanger Network',
    lastModified: '1 day ago',
    progress: 60,
  },
  {
    id: 3,
    name: 'Distillation Column Setup',
    lastModified: '3 days ago',
    progress: 95,
  },
];

const RecentProjects = () => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-semibold">Recent Projects</h2>
        </div>
        <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{project.name}</h3>
              <span className="text-sm text-gray-400">{project.lastModified}</span>
            </div>
            
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all group-hover:scale-x-105"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;