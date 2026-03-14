import React from 'react';

const StatCard = ({ label, value, sub, icon: Icon, colorClass = 'text-[#e8ff3b]' }) => {
  return (
    <div className="card flex flex-col gap-1 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {Icon && <Icon size={40} />}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      </div>
      
      <div className="text-4xl font-heading text-white tracking-wider leading-none">{value}</div>
      <div className="text-[10px] font-bold text-gray-600 mt-4 uppercase tracking-widest flex items-center gap-2">
        <span className="w-4 h-[1px] bg-[#e8ff3b]/30"></span>
        {sub}
      </div>
    </div>
  );
};

export default StatCard;
