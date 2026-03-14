import React from 'react';

const StatCard = ({ label, value, sub, icon: Icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-num">{value}</div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-[1px]">
          {sub}
        </span>
        <div className="text-[12px] font-bold text-[var(--accent)] bg-[#222] px-2 py-0.5 rounded-[var(--radius)]">
          Live
        </div>
      </div>

      {Icon && (
        <div className="absolute top-5 right-5 text-[var(--white)] opacity-10 pointer-events-none">
          <Icon size={32} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
