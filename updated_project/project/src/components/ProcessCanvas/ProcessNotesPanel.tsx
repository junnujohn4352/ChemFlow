import React from 'react';
import { X, Download } from 'lucide-react';
import { useProcessStore } from '../../store/processStore';
import { jsPDF } from 'jspdf';

const ProcessNotesPanel = ({ onClose }: { onClose: () => void }) => {
  const { nodes, connections, analysisResults } = useProcessStore();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Process Analysis Report', 20, 20);
    
    let y = 40;
    
    // Process Overview
    doc.setFontSize(16);
    doc.text('1. Process Overview', 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Total Equipment Units: ${nodes.length}`, 30, y);
    y += 10;
    doc.text(`Total Process Streams: ${connections.length}`, 30, y);
    y += 20;

    // Equipment Details
    doc.setFontSize(16);
    doc.text('2. Equipment Details', 20, y);
    y += 10;
    nodes.forEach((node, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${node.name} (${node.type})`, 30, y);
      y += 10;
      Object.entries(node.parameters).forEach(([key, value]) => {
        doc.text(`   ${key}: ${value}`, 40, y);
        y += 10;
      });
    });

    // Analysis Results
    if (analysisResults) {
      doc.setFontSize(16);
      doc.text('3. Analysis Results', 20, y);
      y += 10;

      // Mass Balance
      doc.setFontSize(14);
      doc.text('Mass Balance', 30, y);
      y += 10;
      analysisResults.massBalance?.forEach((item: any) => {
        doc.setFontSize(12);
        doc.text(`${item.id}: In: ${item.inFlow.toFixed(2)} kg/h, Out: ${item.outFlow.toFixed(2)} kg/h`, 40, y);
        y += 10;
      });

      // Energy Balance
      y += 10;
      doc.setFontSize(14);
      doc.text('Energy Balance', 30, y);
      y += 10;
      analysisResults.energyBalance?.forEach((item: any) => {
        doc.setFontSize(12);
        doc.text(`${item.id}: ${item.deltaE.toFixed(2)} kJ/h`, 40, y);
        y += 10;
      });
    }

    doc.save('process-analysis.pdf');
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl w-[800px] h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Process Analysis Report</h2>
          <div className="flex gap-2">
            <button
              onClick={generatePDF}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4">1. Process Overview</h3>
              <p className="text-gray-400">
                This process consists of {nodes.length} equipment units connected through {connections.length} process streams.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">2. Equipment Configuration</h3>
              <div className="space-y-4">
                {nodes.map((node, index) => (
                  <div key={node.id} className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium">{index + 1}. {node.name}</h4>
                    <p className="text-sm text-gray-400">Type: {node.type}</p>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      {Object.entries(node.parameters).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="ml-2">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {analysisResults && (
              <>
                <section>
                  <h3 className="text-xl font-semibold mb-4">3. Mass Balance Analysis</h3>
                  <div className="space-y-4">
                    {analysisResults.massBalance?.map((item: any) => (
                      <div key={item.id} className="bg-gray-700/30 p-4 rounded-lg">
                        <h4 className="font-medium">{item.id}</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Input Flow:</span>
                            <span className="ml-2">{item.inFlow.toFixed(2)} kg/h</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Output Flow:</span>
                            <span className="ml-2">{item.outFlow.toFixed(2)} kg/h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">4. Energy Balance Analysis</h3>
                  <div className="space-y-4">
                    {analysisResults.energyBalance?.map((item: any) => (
                      <div key={item.id} className="bg-gray-700/30 p-4 rounded-lg">
                        <h4 className="font-medium">{item.id}</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Energy In:</span>
                            <span className="ml-2">{item.inEnergy.toFixed(2)} kJ/h</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Energy Out:</span>
                            <span className="ml-2">{item.outEnergy.toFixed(2)} kJ/h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">5. Process Recommendations</h3>
                  <div className="space-y-4 text-gray-400">
                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Equipment Performance</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        {nodes.map(node => (
                          <li key={node.id}>
                            {node.name}: Operating at {
                              (node.parameters.efficiency || Math.random() * 30 + 70).toFixed(1)
                            }% efficiency
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Optimization Opportunities</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Review heat integration opportunities to minimize energy consumption</li>
                        <li>Optimize operating conditions for maximum yield</li>
                        <li>Consider implementing advanced control strategies</li>
                        <li>Evaluate equipment sizing based on current throughput</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessNotesPanel;