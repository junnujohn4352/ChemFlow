import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { X, ChevronRight } from 'lucide-react';
import { useProcessStore } from '../../store/processStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    }
  }
};

const AnalysisPanel = () => {
  const [activeTab, setActiveTab] = useState('mass');
  const { analysisResults, setAnalysisVisible, nodes, connections } = useProcessStore();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (analysisResults) {
      generateChartData();
    }
  }, [analysisResults, activeTab]);

  const generateChartData = () => {
    switch (activeTab) {
      case 'mass':
        if (analysisResults?.massBalance) {
          setChartData({
            labels: analysisResults.massBalance.map((item: any) => item.id),
            datasets: [
              {
                label: 'Input Flow (kg/h)',
                data: analysisResults.massBalance.map((item: any) => item.inFlow),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
              },
              {
                label: 'Output Flow (kg/h)',
                data: analysisResults.massBalance.map((item: any) => item.outFlow),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
              }
            ]
          });
        }
        break;
      case 'energy':
        if (analysisResults?.energyBalance) {
          setChartData({
            labels: analysisResults.energyBalance.map((item: any) => item.id),
            datasets: [
              {
                label: 'Energy In (kJ/h)',
                data: analysisResults.energyBalance.map((item: any) => item.inEnergy),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.1
              },
              {
                label: 'Energy Out (kJ/h)',
                data: analysisResults.energyBalance.map((item: any) => item.outEnergy),
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                tension: 0.1
              }
            ]
          });
        }
        break;
      // Add more cases for other analysis types
    }
  };

  const tabs = [
    { id: 'mass', label: 'Mass Balance' },
    { id: 'energy', label: 'Energy Balance' },
    { id: 'vle', label: 'VLE' },
    { id: 'heat', label: 'Heat Transfer' },
    { id: 'massTransfer', label: 'Mass Transfer' },
    { id: 'kinetics', label: 'Kinetics' },
    { id: 'pressure', label: 'Pressure Drop' },
    { id: 'thermal', label: 'Thermal Analysis' },
    { id: 'efficiency', label: 'Equipment Efficiency' },
    { id: 'economics', label: 'Economic Analysis' }
  ];

  const renderContent = () => {
    if (!analysisResults) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">No analysis data available. Add equipment and connections to see results.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {chartData && (
          <div className="bg-gray-700/30 p-6 rounded-lg">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

        <div className="bg-gray-700/30 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Detailed Analysis</h4>
          {activeTab === 'mass' && analysisResults.massBalance && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 bg-gray-600/30">Equipment</th>
                    <th className="text-left p-2 bg-gray-600/30">Input Flow (kg/h)</th>
                    <th className="text-left p-2 bg-gray-600/30">Output Flow (kg/h)</th>
                    <th className="text-left p-2 bg-gray-600/30">Accumulation (kg/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.massBalance.map((item: any) => (
                    <tr key={item.id} className="border-t border-gray-600/30">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.inFlow.toFixed(2)}</td>
                      <td className="p-2">{item.outFlow.toFixed(2)}</td>
                      <td className="p-2">{(item.inFlow - item.outFlow).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'energy' && analysisResults.energyBalance && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 bg-gray-600/30">Equipment</th>
                    <th className="text-left p-2 bg-gray-600/30">Energy In (kJ/h)</th>
                    <th className="text-left p-2 bg-gray-600/30">Energy Out (kJ/h)</th>
                    <th className="text-left p-2 bg-gray-600/30">Heat Duty (kJ/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.energyBalance.map((item: any) => (
                    <tr key={item.id} className="border-t border-gray-600/30">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.inEnergy.toFixed(2)}</td>
                      <td className="p-2">{item.outEnergy.toFixed(2)}</td>
                      <td className="p-2">{item.heatDuty?.toFixed(2) || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl w-[90vw] h-[90vh] flex overflow-hidden">
        <div className="w-64 bg-gray-900 p-4">
          <div className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'hover:bg-gray-800'
                }`}
              >
                {tab.label}
                <ChevronRight
                  className={`w-4 h-4 transform transition-transform ${
                    activeTab === tab.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Process Analysis</h2>
            <button
              onClick={() => setAnalysisVisible(false)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;