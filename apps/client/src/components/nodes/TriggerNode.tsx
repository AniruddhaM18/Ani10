import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import ManualTriggerForm from '../modals/ManualTriggerForm';

export default function TriggerNode({ data }: { data: { label: string; type: string } }) {
  const [showForm, setShowForm] = useState(false);

  const handleNodeClick = () => {
    if (data.type === 'manual') {
      setShowForm(true);
    }
  };

  return (
    <>
      <div
        className={`node-trigger p-4 cursor-pointer ${data.type === 'manual' ? 'hover:bg-blue-50' : ''}`}
        onClick={handleNodeClick}
      >
        <Handle type="source" position={Position.Right} id="out" />
        <div className="font-medium">{data.label}</div>
        <div className="text-xs text-gray-500">Trigger</div>
      </div>

      {showForm && (
        <ManualTriggerForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
}