
import React from 'react';
import { InvoiceStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  status: InvoiceStatus;
}

export const Badge: React.FC<BadgeProps> = ({ children, status }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize';
  
  const statusClasses = {
    [InvoiceStatus.Paid]: 'bg-status-paid-bg text-status-paid',
    [InvoiceStatus.Pending]: 'bg-status-pending-bg text-status-pending',
    [InvoiceStatus.Overdue]: 'bg-status-overdue-bg text-status-overdue',
    [InvoiceStatus.Draft]: 'bg-gray-100 text-gray-600',
  };

  const dotClasses = {
    [InvoiceStatus.Paid]: 'bg-status-paid',
    [InvoiceStatus.Pending]: 'bg-status-pending',
    [InvoiceStatus.Overdue]: 'bg-status-overdue',
    [InvoiceStatus.Draft]: 'bg-gray-400',
  }

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
        <span className={`w-2 h-2 mr-2 rounded-full ${dotClasses[status]}`}></span>
        {children}
    </span>
  );
};
