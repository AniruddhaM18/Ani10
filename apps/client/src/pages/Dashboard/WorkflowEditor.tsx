import { useState, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import Custom Nodes
import TriggerNode from '../../components/nodes/TriggerNode';
import ActionNode from '../../components/nodes/ActionNode';
import CustomNode from '../../components/nodes/CustomNode';

// Define node types
const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  custom: CustomNode,
};

// Initial nodes: Manual + Webhook triggers
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 50, y: 50 },
    data: { label: 'Manual Trigger', type: 'manual' },
  },
  {
    id: '2',
    type: 'trigger',
    position: { x: 50, y: 200 },
    data: { label: 'Webhook Trigger', type: 'webhook' },
  },
];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [showAddNode, setShowAddNode] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to add a new node at random position
  const addNode = (
    type: 'trigger' | 'action' | 'custom',
    label: string,
    extraData: Record<string, any> = {}
  ) => {
    const newNode: Node = {
      id: `${Date.now()}`, // Unique ID
      type,
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      },
      data: { label, ...extraData },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowAddNode(false);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm border relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Background />
        <Controls />
        <MiniMap />

        {/* Floating "Add Node" Panel */}
        <Panel position="top-right" className="p-2">
          <button
            onClick={() => setShowAddNode(!showAddNode)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Add Node
          </button>
        </Panel>

        {/* Add Node Modal/Panel */}
        {showAddNode && (
          <Panel position="top-right" className="mt-16 mr-2 p-4 bg-white rounded shadow-lg border max-w-xs z-50">
            <h4 className="font-bold text-gray-800 mb-3">Add Node</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => addNode('trigger', 'Manual Trigger', { type: 'manual' })}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-50 text-blue-700 border border-blue-200"
              >
                🖱️ Manual Trigger
              </button>
              <button
                type="button"
                onClick={() => addNode('trigger', 'Webhook Trigger', { type: 'webhook' })}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-50 text-blue-700 border border-blue-200"
              >
                🌐 Webhook Trigger
              </button>
              <button
                type="button"
                onClick={() => addNode('action', 'Email via Resend')}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-purple-50 text-purple-700 border border-purple-200"
              >
                ✉️ Email via Resend
              </button>
              <button
                type="button"
                onClick={() => addNode('action', 'Telegram Message')}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-purple-50 text-purple-700 border border-purple-200"
              >
                📱 Telegram Message
              </button>
              <button
                type="button"
                onClick={() => addNode('custom', 'Custom Node')}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-green-50 text-green-700 border border-green-200"
              >
                🧩 Custom Node
              </button>
            </div>
            <button
              onClick={() => setShowAddNode(false)}
              className="mt-3 w-full px-3 py-2 text-red-600 text-sm hover:bg-red-50 rounded border border-red-200"
            >
              Cancel
            </button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
