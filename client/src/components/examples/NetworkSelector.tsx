import NetworkSelector from '../NetworkSelector';
import { useState } from 'react';

export default function NetworkSelectorExample() {
  const [selected, setSelected] = useState<"base" | "monad">("base");

  return (
    <div className="p-4">
      <NetworkSelector 
        selected={selected} 
        onChange={setSelected}
      />
    </div>
  );
}
