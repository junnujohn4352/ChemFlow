import { create } from 'zustand';
import { Equipment, ProcessStream, ThermodynamicModel, Chemical } from '../types';
import { calculateMassBalance, calculateEnergyBalance, calculateVLE } from '../utils/calculations';

interface ProcessStore {
  nodes: Equipment[];
  connections: ProcessStream[];
  selectedNode: Equipment | null;
  analysisResults: any | null;
  isAnalysisVisible: boolean;
  selectedModel: ThermodynamicModel | null;
  
  // Actions
  setSelectedModel: (model: ThermodynamicModel) => void;
  addNode: (node: Equipment) => void;
  updateNode: (id: string, data: Partial<Equipment>) => void;
  setSelectedNode: (node: Equipment | null) => void;
  addConnection: (connection: Partial<ProcessStream>) => void;
  calculateResults: () => void;
  setAnalysisVisible: (visible: boolean) => void;
  addChemicalNode: (chemical: Chemical, position: { x: number; y: number }) => void;
}

export const useProcessStore = create<ProcessStore>((set, get) => ({
  nodes: [],
  connections: [],
  selectedNode: null,
  analysisResults: null,
  isAnalysisVisible: false,
  selectedModel: null,
  
  setSelectedModel: (model) => set({ selectedModel: model }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),

  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, ...data } : node
    )
  })),

  setSelectedNode: (node) => set({ selectedNode: node }),

  addConnection: (connection) => {
    const sourceNode = get().nodes.find(n => n.id === connection.sourceId);
    const targetNode = get().nodes.find(n => n.id === connection.targetId);
    
    if (sourceNode && targetNode) {
      const streamData: ProcessStream = {
        id: `stream-${Date.now()}`,
        sourceId: connection.sourceId!,
        targetId: connection.targetId!,
        composition: sourceNode.parameters.composition || [],
        temperature: sourceNode.parameters.temperature || 0,
        pressure: sourceNode.parameters.pressure || 0,
        totalFlow: sourceNode.parameters.flowRate || 0
      };
      
      set((state) => ({
        connections: [...state.connections, streamData]
      }));
    }
  },

  addChemicalNode: (chemical, position) => {
    const node: Equipment = {
      id: `chemical_${chemical.id}_${Date.now()}`,
      type: EquipmentType.FEED_TANK,
      position,
      name: chemical.name,
      parameters: {
        temperature: 0,
        pressure: 0,
        flowRate: 0,
        composition: [{
          chemicalId: chemical.id,
          moleFraction: 1,
          massFlow: 0,
          temperature: 0,
          pressure: 0
        }]
      }
    };
    
    set((state) => ({
      nodes: [...state.nodes, node]
    }));
  },

  calculateResults: () => {
    const { nodes, connections, selectedModel } = get();
    
    if (nodes.length === 0 || !selectedModel) {
      set({ 
        analysisResults: null,
        isAnalysisVisible: false 
      });
      return;
    }
    
    const massBalance = calculateMassBalance(nodes, connections);
    const energyBalance = calculateEnergyBalance(nodes, connections);
    const vle = calculateVLE(nodes);
    
    set({
      analysisResults: {
        massBalance,
        energyBalance,
        vle
      },
      isAnalysisVisible: true
    });
  },

  setAnalysisVisible: (visible) => set({ isAnalysisVisible: visible })
}));