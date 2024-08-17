import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

// Define a context type
interface ToastContextType {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  notifyWarning: (message: string) => void;
}

// Create a context with a default empty function
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a provider component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const notifyWarning = (message: string) => toast.warn(message);

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError, notifyWarning }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
