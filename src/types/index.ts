export type Priority = 'low' | 'normal' | 'high';
export type Status = 'planned' | 'finished';

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
}

export interface TaskTemplate {
  id: string;
  title: string;
  defaults: {
    title: string;
    priority: Priority;
  };
}