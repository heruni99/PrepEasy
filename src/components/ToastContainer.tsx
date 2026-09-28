import React from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1C1917] backdrop-blur-md animate-in slide-in-from-bottom duration-300 ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-950'
                : isWarning
                ? 'bg-amber-50 text-amber-950'
                : isError
                ? 'bg-rose-50 text-rose-950'
                : 'bg-sky-50 text-sky-950'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 stroke-[2.5]" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 stroke-[2.5]" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 stroke-[2.5]" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-sky-700 shrink-0 stroke-[2.5]" />}
              
              <span className="text-xs font-black text-stone-900">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-stone-700 hover:text-stone-950 p-0.5 rounded-lg hover:bg-stone-200"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
