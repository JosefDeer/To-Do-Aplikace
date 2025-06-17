import React from 'react';
import type { TaskTemplate } from '../types';
import { getPriorityLabel, getPriorityColorClass } from '../utils/priorityUtils';

interface TemplateListProps {
  templates: TaskTemplate[];
  onSelect: (template: TaskTemplate) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ templates, onSelect }) => {
  return (
    <div className="template-list">
      {templates.map(template => (
        <div
          key={template.id}
          className={`template-item ${getPriorityColorClass(template.defaults.priority)}`}
          onClick={() => onSelect(template)}
        >
          <div className="template-title">{template.title}</div>
          <div>Priorita: {getPriorityLabel(template.defaults.priority)}</div>
        </div>
      ))}
    </div>
  );
};