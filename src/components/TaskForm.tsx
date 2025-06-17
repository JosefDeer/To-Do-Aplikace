import React from 'react';
import type { Priority } from '../types';

interface TaskFormProps {
  title: string;
  priority: Priority;
  onTitleChange: (title: string) => void;
  onPriorityChange: (priority: Priority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  title,
  priority,
  onTitleChange,
  onPriorityChange
}) => {
  return (
    <>
      <div className="form-group">
        <label className="form-label">Název úkolu</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="např. Review pull request"
          className="text-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Priorita</label>
        <label className={`radio-label priority-high ${priority === 'high' ? 'active' : ''}`}>
          <input
            type="radio"
            checked={priority === 'high'}
            onChange={() => onPriorityChange('high')}
          />
          Vysoká
        </label>
        <label className={`radio-label priority-normal ${priority === 'normal' ? 'active' : ''}`}>
          <input
            type="radio"
            checked={priority === 'normal'}
            onChange={() => onPriorityChange('normal')}
          />
          Normální
        </label>
        <label className={`radio-label priority-low ${priority === 'low' ? 'active' : ''}`}>
          <input
            type="radio"
            checked={priority === 'low'}
            onChange={() => onPriorityChange('low')}
          />
          Nízká
        </label>
      </div>
    </>
  );
};