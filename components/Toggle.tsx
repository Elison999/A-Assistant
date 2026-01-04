
import React from 'react';

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange, description }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="text-sm font-medium text-slate-200">{label}</h4>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? 'bg-blue-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};
