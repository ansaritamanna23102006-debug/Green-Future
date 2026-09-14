"use client";

import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Search, GitBranch, Coins, Award, RefreshCw } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

// Custom node rendering component
function CustomNode({ data }) {
  const isActive = data.status === "Active";
  const initials = (data.name || "GFT").split(" ").map((n) => n[0]).join("");

  return (
    <div className={`p-4.5 rounded-3xl border transition-all duration-300 min-w-[210px] shadow-xl text-left relative overflow-hidden group hover:scale-[1.03] hover:shadow-gft-primary/20 ${
      isActive
        ? "bg-gradient-to-b from-[#082F2C] to-[#041D1C] border-[#104C48] hover:border-gft-primary text-white"
        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
    }`}>
      {/* Top Handle */}
      {data.wing !== "Root" && (
        <Handle 
          type="target" 
          position={Position.Top} 
          className={`!w-2.5 !h-2.5 !border-0 ${isActive ? "!bg-gft-primary glow-green" : "!bg-zinc-700"}`} 
        />
      )}

      {/* Glow highlight */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
        isActive ? "bg-gft-primary/10 group-hover:bg-gft-primary/25" : "bg-zinc-800/10"
      }`} />

      {/* Status & Placement badges */}
      <div className="flex justify-between items-center mb-3">
        <span className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full tracking-wider flex items-center gap-1 ${
          isActive 
            ? "bg-gft-primary/10 text-gft-accent border border-gft-primary/20" 
            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-gft-primary animate-pulse" : "bg-rose-500"}`} />
          {data.status}
        </span>
        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
          data.wing === "Root" 
            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
            : data.wing === "Left" 
              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" 
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        }`}>
          {data.wing} Wing
        </span>
      </div>

      {/* Profile & Info Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 shadow-inner relative border ${
          isActive 
            ? "bg-gft-dark/60 text-gft-accent border-gft-primary/30 group-hover:border-gft-primary text-white" 
            : "bg-zinc-800 text-zinc-400 border-zinc-700"
        }`}>
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className={`text-xs font-extrabold truncate transition-colors ${isActive ? "text-white group-hover:text-gft-accent" : "text-zinc-300"}`}>{data.name}</h4>
          <p className={`text-[9px] font-semibold tracking-wider ${isActive ? "text-white/40" : "text-zinc-400"}`}>{data.memberId}</p>
        </div>
      </div>
      
      {/* Lower Meta Stats Grid */}
      <div className="border-t border-white/5 mt-3 pt-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-white/45 flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-gft-accent/70" />
            Package
          </span>
          <span className={`font-extrabold ${isActive ? "text-gft-accent" : "text-zinc-300"}`}>{data.package}</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-white/45 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-gft-primary/70" />
            Rank
          </span>
          <span className={`font-semibold truncate max-w-[90px] ${isActive ? "text-white/80" : "text-zinc-300"}`}>{data.designation}</span>
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`!w-2.5 !h-2.5 !border-0 ${isActive ? "!bg-gft-primary glow-green" : "!bg-zinc-700"}`} 
      />
    </div>
  );
}

const nodeTypes = {
  customNode: CustomNode,
};

export default function GenealogyTreePage() {
  const { user } = useApp();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTreeQuery, setSearchTreeQuery] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [baseNodes, setBaseNodes] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchBinaryTree = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("gft_token");
      if (!token) return;

      const res = await fetch(`${API_URL}/genealogy/binary-tree?depth=4`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.status === "success" && data.data) {
        const treeRoot = data.data;
        const generatedNodes = [];
        const generatedEdges = [];

        const traverse = (node, depth, x, y, parentId, wing, xOffset) => {
          if (!node) return;
          const id = node.userId || `temp-${Math.random()}`;

          generatedNodes.push({
            id,
            type: "customNode",
            position: { x, y },
            data: {
              name: node.name || "Member",
              memberId: node.userId || "GFT",
              status: node.status === "active" ? "Active" : "Inactive",
              designation: (node.rank && node.rank !== "none") ? node.rank.toUpperCase() : "MEMBER",
              package: node.activePackageName || "None",
              wing,
            },
          });

          if (parentId) {
            generatedEdges.push({
              id: `e-${parentId}-${id}`,
              source: parentId,
              target: id,
              animated: true,
              style: { stroke: "#65B300", strokeWidth: 2, strokeDasharray: "5, 5" },
            });
          }

          if (node.left) {
            traverse(node.left, depth + 1, x - xOffset, y + 160, id, "Left", xOffset / 1.8);
          }
          if (node.right) {
            traverse(node.right, depth + 1, x + xOffset, y + 160, id, "Right", xOffset / 1.8);
          }
        };

        traverse(treeRoot, 1, 320, 20, null, "Root", 220);
        setNodes(generatedNodes);
        setEdges(generatedEdges);
        setBaseNodes(generatedNodes);
      }
    } catch (err) {
      console.error("Failed to load binary tree:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchBinaryTree();
  }, []);

  const handleSearchTree = (e) => {
    e.preventDefault();
    if (!searchTreeQuery.trim()) {
      setNodes(baseNodes);
      return;
    }
    const filteredNodes = baseNodes.map((node) => {
      const match =
        node.data.name.toLowerCase().includes(searchTreeQuery.toLowerCase()) ||
        node.data.memberId.toLowerCase().includes(searchTreeQuery.toLowerCase());
      return {
        ...node,
        style: match
          ? { border: "3px solid #8CD83D", boxShadow: "0 0 20px #8CD83D" }
          : {},
      };
    });
    setNodes(filteredNodes);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 select-none text-white">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Graphical Binary Tree</h1>
          <p className="text-white/60 text-sm mt-1">
            Authoritative binary placement structure and active partner nodes across compensation wings.
          </p>
        </div>
        <button
          onClick={fetchBinaryTree}
          disabled={loading}
          className="flex items-center gap-2 bg-gft-card-dark border border-gft-border-dark px-4 py-2 rounded-xl text-xs font-bold hover:bg-gft-primary/20 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Tree
        </button>
      </div>

      <div className="bg-gft-card-dark border border-gft-border-dark rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Controls row */}
        <div className="p-4 border-b border-gft-border-dark bg-gft-dark-bg/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-gft-primary" />
            <h3 className="text-sm font-bold text-white">GFT Binary Matrix Network</h3>
          </div>

          <form onSubmit={handleSearchTree} className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchTreeQuery}
                onChange={(e) => setSearchTreeQuery(e.target.value)}
                placeholder="Find member..."
                className="w-full bg-white/5 border border-gft-border-dark rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:border-gft-primary text-white placeholder-white/40"
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
        <div className="h-[560px] w-full bg-zinc-950 relative">
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-10">
              <div className="flex items-center gap-2 text-sm text-gft-accent font-bold">
                <RefreshCw className="animate-spin" size={16} /> Loading Network Structure...
              </div>
            </div>
          )}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#104C48" gap={16} size={1} />
            <Controls className="fill-white text-white" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
