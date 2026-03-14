import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = ({ message = 'Loading Agency Revenue...' }) => {
  return (
    <div className="fixed inset-0 bg-[#0F1117] flex flex-col items-center justify-center z-50">
      <Loader2 size={40} className="text-indigo-500 animate-spin mb-4" />
      <p className="text-gray-400 font-medium text-sm tracking-wide">{message}</p>
    </div>
  );
};

export default PageLoader;
