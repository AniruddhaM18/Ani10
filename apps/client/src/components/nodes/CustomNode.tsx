import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }: { data: { label: string } }) {
  return (
    <div className="node-custom p-4">
      <Handle type="target" position={Position.Left} id="in" />
      <Handle type="source" position={Position.Right} id="out" />
      <div className="font-medium">{data.label}</div>
      <div className="text-xs text-gray-500">Custom</div>
    </div>
  );
}