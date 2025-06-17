import React from 'react';
import type { Task } from '../types';
import { getPriorityLabel, getPriorityColorClass } from '../utils/priorityUtils';

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDelete }) => {
  return (
    <div className={`task-card ${task.status === 'finished' ? 'finished' : ''} ${getPriorityColorClass(task.priority)}`}>
      <div className="task-title">{task.title}</div>
      <div className="task-priority">Priorita: {getPriorityLabel(task.priority)}</div>
      <div className="task-buttons">
        {task.status === 'planned' && (
          <button className="buttonDokončit" onClick={() => onComplete(task.id)}>
            Dokončit
          </button>
        )}
        <button className="button" onClick={() => onDelete(task.id)}>
          Odstranit
        </button>
      </div>
    </div>
  );
};