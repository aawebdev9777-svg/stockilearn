import React, { useState, useEffect } from "react";

// Inline control for setting a user's league server (league_instance).
// Commits on blur / Enter; reverts if invalid or unchanged.
export default function ServerSetter({ value, onSet }) {
  const [val, setVal] = useState(String(value || 1));

  useEffect(() => { setVal(String(value || 1)); }, [value]);

  const commit = () => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n > 0 && n !== (value || 1)) {
      onSet(n);
    } else {
      setVal(String(value || 1));
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-bold text-muted-foreground whitespace-nowrap">Server</span>
      <input
        type="number"
        min="1"
        value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={e => e.key === "Enter" && e.target.blur()}
        className="w-12 text-[10px] text-center bg-card border border-border rounded-lg px-1 py-0.5 text-foreground outline-none focus:border-primary"
      />
    </div>
  );
}