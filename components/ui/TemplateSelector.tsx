
import React from 'react';
import { InvoiceTemplate } from '../../types';
import { cn } from '../utils';

const templates = [
  { id: 'classic', name: 'Classic', imageUrl: 'https://i.imgur.com/uG9t3T6.png' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://i.imgur.com/g0aB2kS.png' },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://i.imgur.com/tY7dchL.png' },
] as const;

interface TemplateSelectorProps {
  selectedValue: InvoiceTemplate;
  onSelect: (template: InvoiceTemplate) => void;
}

const TemplatePreview: React.FC<{ name: string; imageUrl: string; isSelected: boolean; onClick: () => void; }> = ({ name, imageUrl, isSelected, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer text-center">
    <div className={cn(
        'p-1 rounded-lg border-2 transition-all duration-200 group-hover:border-brand-orange/70',
        isSelected ? 'border-brand-orange' : 'border-white/10'
    )}>
      <img src={imageUrl} alt={`${name} template preview`} className="w-full h-auto rounded-md shadow-lg" />
    </div>
    <p className={cn(
        'text-sm mt-2 font-medium transition-colors capitalize',
        isSelected ? 'text-brand-orange' : 'text-brand-text-secondary group-hover:text-brand-text-primary'
    )}>{name}</p>
  </div>
);

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedValue, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map(template => (
        <TemplatePreview
          key={template.id}
          name={template.name}
          imageUrl={template.imageUrl}
          isSelected={selectedValue === template.id}
          onClick={() => onSelect(template.id)}
        />
      ))}
    </div>
  );
};
