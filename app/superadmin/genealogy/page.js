'use client';
import { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network, Search, Filter } from 'lucide-react';
import { genealogyNodes, genealogyEdges } from '@/lib/adminDummyData';

// Custom Node component
const CustomNode = ({ data }) => {
  return (
    <div className="bg-white dark:bg-[#062F2D] border-2 border-[#65B300] rounded-xl shadow-lg p-3 w-48 text-center">
      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#65B300] to-[#0A4D45] rounded-full flex items-center justify-center text-white mb-2">
        <Network size={20} />
      </div>
      <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{data.label.split(' (')[0]}</p>
      <p className="text-xs text-[#65B300] mt-1 truncate">{data.label.match(/\((.*?)\)/)?.[1]}</p>
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#0A4D45] flex justify-between text-[10px]">
        <span className="text-gray-500">Left: 24</span>
        <span className="text-gray-500">Right: 15</span>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function GenealogyManagement() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    genealogyNodes.map(node => ({ ...node, type: 'custom' }))
  );
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    genealogyEdges.map(edge => ({
      ...edge,
      animated: true,
      style: { stroke: '#65B300', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#65B300' }
    }))
  );

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Network className="text-[#65B300]" />
            Genealogy Tree
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Visualize and analyze member network structure.</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search User ID..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-lg text-sm focus:ring-2 focus:ring-[#65B300] outline-none dark:text-white transition-colors"
            />
          </div>
          <button className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] p-2 rounded-lg text-gray-500 hover:text-[#65B300] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#65B300" gap={16} size={1} opacity={0.1} />
          <Controls className="bg-white dark:bg-[#0A4D45] border-gray-200 dark:border-[#062F2D] fill-gray-700 dark:fill-gray-300" />
          <MiniMap 
            nodeColor="#65B300" 
            maskColor="rgba(10, 77, 69, 0.1)"
            className="bg-gray-50 dark:bg-[#0A4D45] border-gray-200 dark:border-[#062F2D]" 
          />
        </ReactFlow>
        
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-[#0A4D45]/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-[#062F2D] shadow-lg text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-[#65B300] rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Active Member</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Inactive Member</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">Pending KYC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
