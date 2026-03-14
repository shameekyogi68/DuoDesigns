import React from 'react';

const StatusBadge = ({ status }) => {
  const isPaid = status === 'paid';
  
  return (
    <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
