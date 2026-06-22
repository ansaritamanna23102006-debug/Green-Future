"use client";

import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import { Search, GitBranch } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

// Custom node rendering component
function CustomNode({ data }) {
  const isActive = data.status === "Active";

  return (
    <div className={`p-4 rounded-2xl border transition-all min-w-[170px] shadow-lg text-left ${
      isActive
        ? "bg-gft-card-dark border-gft-primary text-white"
        : "bg-zinc-900 border-zinc-700 text-zinc-400"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full ${
          isActive ? "bg-gft-primary/10 text-gft-primary" : "bg-rose-500/10 text-rose-500"
        }`}>
          {data.status}
        </span>
        <span className="text-[9px] font-bold text-gft-accent">{data.wing} Wing</span>
      </div>

      <h4 className="text-xs font-bold">{data.name}</h4>
      <p className="text-[10px] text-gft-accent font-semibold tracking-wider mt-0.5">{data.memberId}</p>
      
      <div className="border-t border-white/5 mt-3 pt-2 flex justify-between items-center text-[9px]">
        <span className="text-white/45">Package</span>
        <span className="font-extrabold">${data.package}</span>
      </div>
      <div className="flex justify-between items-center text-[9px] mt-1">
        <span className="text-white/45">Rank</span>
        <span className="font-semibold">{data.designation}</span>
      </div>
    </div>
  );
}

const nodeTypes = {
  customNode: CustomNode
};

export default function GenealogyTreePage() {
  const { user } = useApp();
  const [mounted, setMounted] = useState(false);

  const [searchTreeQuery, setSearchTreeQuery] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const initialNodes = [
    { id: "1", type: "customNode", position: { x: 260, y: 20 }, data: { name: "Alexander Pierce", memberId: "GFT908127", status: "Active", designation: "Emerald Director", package: "2500", wing: "Root" } },
    { id: "2", type: "customNode", position: { x: 80, y: 180 }, data: { name: "Elena Rostova", memberId: "GFT100201", status: "Active", designation: "Emerald Manager", package: "2500", wing: "Left" } },
    { id: "3", type: "customNode", position: { x: 440, y: 180 }, data: { name: "Siddharth Kumar", memberId: "GFT100340", status: "Active", designation: "Ruby Director", package: "1000", wing: "Right" } },
    { id: "4", type: "customNode", position: { x: -30, y: 340 }, data: { name: "Marcus Aurelius", memberId: "GFT100098", status: "Active", designation: "Sapphire Executive", package: "500", wing: "Left" } },
    { id: "5", type: "customNode", position: { x: 180, y: 340 }, data: { name: "Sarah Jenkins", memberId: "GFT100112", status: "Active", designation: "Associate", package: "100", wing: "Right" } },
    { id: "6", type: "customNode", position: { x: 330, y: 340 }, data: { name: "Chloe Dupont", memberId: "GFT100155", status: "Inactive", designation: "Associate", package: "100", wing: "Left" } },
    { id: "7", type: "customNode", position: { x: 540, y: 340 }, data: { name: "Zahir Al-Hassan", memberId: "GFT100412", status: "Active", designation: "Sapphire Executive", package: "500", wing: "Right" } }
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#65B300", strokeWidth: 2 } },
    { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#65B300", strokeWidth: 2 } },
    { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#65B300", strokeWidth: 2 } },
    { id: "e2-5", source: "2", target: "5", animated: true, style: { stroke: "#65B300", strokeWidth: 2 } },
    { id: "e3-6", source: "3", target: "6", animated: false, style: { stroke: "#555", strokeWidth: 1.5 } },
    { id: "e3-7", source: "3", target: "7", animated: true, style: { stroke: "#65B300", strokeWidth: 2 } }
  ];

  useEffect(() => {
    setMounted(true);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const handleSearchTree = (e) => {
    e.preventDefault();
    if (!searchTreeQuery) {
      setNodes(initialNodes);
      return;
    }
    const filteredNodes = initialNodes.map((node) => {
      const match = node.data.name.toLowerCase().includes(searchTreeQuery.toLowerCase()) ||
                    node.data.memberId.toLowerCase().includes(searchTreeQuery.toLowerCase());
      return {
        ...node,
        style: match ? { border: "3px solid #8CD83D", boxShadow: "0 0 20px #8CD83D" } : {}
      };
    });
    setNodes(filteredNodes);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 select-none">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Graphical Binary Tree</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Visualize independent partner nodes and active placements across wings.</p>
      </div>

      <div className="bg-white border border-gft-gray-light rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Controls row */}
        <div className="p-4 border-b border-gft-gray-light bg-gft-light/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-gft-primary" />
            <h3 className="text-sm font-bold text-gft-deep">GFT Binary Matrix Network</h3>
          </div>

          <form onSubmit={handleSearchTree} className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gft-deep/40">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchTreeQuery}
                onChange={(e) => setSearchTreeQuery(e.target.value)}
                placeholder="Find member..."
                className="w-full bg-white border border-gft-gray-light rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:border-gft-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-gft-primary hover:bg-gft-accent text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Highlight
            </button>
          </form>
        </div>

        {/* React Flow Viewport */}
        <div className="h-[520px] w-full bg-zinc-950">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#104C48" gap={16} size={1} />
            <Controls className="fill-white" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
