import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-ambient-deep border flex items-start gap-3 ${
        isSuccess 
          ? 'bg-surface-container-lowest border-secondary-container text-primary' 
          : isError 
          ? 'bg-error-container text-on-error-container border-error/20' 
          : 'bg-surface-container-lowest border-outline-variant text-on-surface'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-secondary" />}
          {isError && <AlertCircle className="w-5 h-5 text-error" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-primary" />}
        </div>
        <div className="flex-1">
          {toast.title && <h4 className="font-semibold text-sm mb-0.5">{toast.title}</h4>}
          <p className="text-xs leading-relaxed text-on-surface-variant">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-high transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
