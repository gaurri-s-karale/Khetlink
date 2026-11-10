import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-gov-agri flex-shrink-0" />;
      case 'info':
        return <Info className="w-4 h-4 text-gov-secondary flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-gov-accent flex-shrink-0" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-white border-gov-agri/40 shadow-gov-md';
      case 'info':
        return 'bg-white border-gov-secondary/40 shadow-gov-md';
      case 'warning':
        return 'bg-white border-gov-accent/40 shadow-gov-md';
      case 'error':
        return 'bg-white border-red-300 shadow-gov-md';
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center space-x-2.5 px-4 py-3 rounded border ${getBg()} max-w-sm`}>
        {getIcon()}
        <p className="text-xs font-semibold text-gov-text">{toast.message}</p>
      </div>
    </div>
  );
};
