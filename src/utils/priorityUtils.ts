import type { Priority } from '../types/index';

export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'Vysoká';
    case 'normal': return 'Normální';
    case 'low': return 'Nízká';
    default: return '';
  }
};

export const getPriorityColorClass = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'priority-high';
    case 'normal': return 'priority-normal';
    case 'low': return 'priority-low';
    default: return '';
  }
};