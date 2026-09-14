'use client';
import { useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network, Search, RefreshCw } from 'lucide-react';

// Custom Node component
const CustomNode = ({ data }) => {
  const isActive = data.status === "active" || data.status === "Active";
  return (
    <div className={`border-2 rounded-xl shadow-lg p-3 w-48 text-center transition-all ${
      isActive 
        ? "bg-white dark:bg-[#062F2D] border-[#65B300]"
        : "bg-zinc-100 dark:bg-zinc-900 border-zinc-500"
    }`}>
      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white mb-2 ${
        isActive 
          ? "bg-gradient-to-br from-[#65B300] to-[#0A4D45]"
          : "bg-zinc-700 text-zinc-400"
      }`}>
        <Network size={20} />
      </div>
      <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{data.name || "Member"}</p>
      <p className="text-xs text-[#65B300] mt-1 font-mono font-bold truncate">{data.userId || "GFT"}</p>
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#0A4D45] flex justify-between text-[10px]">
        <span className="text-gray-500 capitalize">{data.wing || "Root"} Wing</span>
        <span className={isActive ? "text-[#65B300] font-bold" : "text-zinc-400"}>
          {data.package || "None"}
        </span>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function GenealogyManagement() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [activeRootId, setActiveRootId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchTree = async (targetId = "") => {
    try {
      setLoading(true);
      setErrorMessage("");
      const token = localStorage.getItem("gft_token");
      if (!token) return;

      const url = targetId 
        ? `${API_URL}/genealogy/binary-tree?userId=${encodeURIComponent(targetId)}&depth=4`
        : `${API_URL}/genealogy/binary-tree?depth=4`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.status === "success" && data.data) {
        const root = data.data;
        setActiveRootId(root.userId);
        const generatedNodes = [];
        const generatedEdges = [];

        const traverse = (node, depth, x, y, parentId, wing, xOffset) => {
          if (!node) return;
          const id = node.userId || `node-${Math.random()}`;

          generatedNodes.push({
            id,
            type: "custom",
            position: { x, y },
            data: {
              name: node.name,
              userId: node.userId,
              status: node.status,
              package: node.activePackageName || "None",
              rank: node.rank,
              wing,
            },
          });

          if (parentId) {
            generatedEdges.push({
              id: `edge-${parentId}-${id}`,
              source: parentId,
              target: id,
              animated: true,
              style: { stroke: "#65B300", strokeWidth: 2 },
              markerEnd: { type: MarkerType.ArrowClosed, color: "#65B300" },
            });
          }

          if (node.left) {
            traverse(node.left, depth + 1, x - xOffset, y + 160, id, "Left", xOffset / 1.8);
          }
          if (node.right) {
            traverse(node.right, depth + 1, x + xOffset, y + 160, id, "Right", xOffset / 1.8);
          }
        };

        traverse(root, 1, 300, 20, null, "Root", 220);
        setNodes(generatedNodes);
        setEdges(generatedEdges);
      } else {
        setErrorMessage(data.message || "User or genealogy node not found.");
      }
    } catch (err) {
      console.error("Admin genealogy fetch failed:", err);
      setErrorMessage("Failed to communicate with genealogy service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchUserId.trim()) {
      fetchTree(searchUserId.trim());
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Network className="text-[#65B300]" />
            Genealogy Tree Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Administrative inspection of member network structures (Active Root: {activeRootId || "None"}).
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              placeholder="Enter User ID (e.g. GFT100201)..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-lg text-sm focus:ring-2 focus:ring-[#65B300] outline-none dark:text-white transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#65B300] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#529200] transition-colors flex items-center gap-1.5"
          >
            {loading ? <RefreshCw className="animate-spin" size={14} /> : "Inspect"}
          </button>
        </form>
      </div>

      {errorMessage && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-lg text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* React Flow Canvas */}
      <div className="flex-1 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-20 text-white text-xs font-bold gap-2">
            <RefreshCw className="animate-spin text-[#65B300]" size={16} /> Loading Hierarchy...
          </div>
        )}

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
      </div>
    </div>
  );
}
