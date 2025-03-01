import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { BarChart2, HelpCircle, FileText } from 'lucide-react';
import 'reactflow/dist/style.css';

import EquipmentNode from './EquipmentNode';
import Sidebar from './Sidebar';
import ParametersPanel from './ParametersPanel';
import AnalysisPanel from './AnalysisPanel';
import TutorialPanel from './TutorialPanel';
import ProcessNotesPanel from './ProcessNotesPanel';
import { useProcessStore } from '../../store/processStore';
import { Equipment, EquipmentType } from '../../types';

const nodeTypes = {
  equipmentNode: EquipmentNode,
};

let id = 1;
const getId = () => `node_${id++}`;

const ProcessCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [showNotes, setShowNotes] = React.useState(false);
  
  const {
    selectedNode,
    setSelectedNode,
    calculateResults,
    isAnalysisVisible,
    addNode,
    updateNode,
    addConnection
  } = useProcessStore();

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = addEdge(params, edges);
      setEdges(edge);
      if (params.source && params.target) {
        addConnection(params);
      }
    },
    [edges, setEdges, addConnection]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 240,
        y: event.clientY - reactFlowBounds.top - 64,
      };

      const newNode: Equipment = {
        id: getId(),
        type: type as EquipmentType,
        position,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${id}`,
        parameters: {
          temperature: 25,
          pressure: 1,
          flowRate: 100,
        },
      };

      addNode(newNode);
      setNodes((nds) => [
        ...nds,
        {
          id: newNode.id,
          type: 'equipmentNode',
          position,
          data: newNode,
          dragHandle: '.drag-handle',
        },
      ]);
    },
    [addNode, setNodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.data as Equipment);
    },
    [setSelectedNode]
  );

  const handleParameterUpdate = useCallback(
    (updated: Equipment) => {
      updateNode(updated.id, updated);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === updated.id ? { ...node, data: updated } : node
        )
      );
    },
    [updateNode, setNodes]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 h-full relative" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Tutorial
          </button>
          <button
            onClick={calculateResults}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <BarChart2 className="w-5 h-5" />
            View Analysis
          </button>
          <button
            onClick={() => setShowNotes(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Process Notes
          </button>
        </div>
      </div>
      
      {selectedNode && (
        <ParametersPanel
          equipment={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={handleParameterUpdate}
        />
      )}
      
      {isAnalysisVisible && <AnalysisPanel />}
      {showTutorial && <TutorialPanel onClose={() => setShowTutorial(false)} />}
      {showNotes && <ProcessNotesPanel onClose={() => setShowNotes(false)} />}
    </div>
  );
};

export default ProcessCanvas;