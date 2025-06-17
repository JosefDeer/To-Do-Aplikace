import { useState } from 'react';
import './App.css';
import { TaskCard } from './components/TaskCard';
import { CreateTaskModal } from './components/CreateTaskModal';
import type { Task, TaskTemplate, Priority } from './types';

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Review pull request', status: 'planned', priority: 'high' },
    { id: 2, title: 'Schedule team meeting', status: 'planned', priority: 'normal' },
    { id: 3, title: 'Archive old project files', status: 'finished', priority: 'low' },
    { id: 4, title: 'Draft quarterly report', status: 'planned', priority: 'normal' },
    { id: 5, title: 'Onboard new hire', status: 'finished', priority: 'high' }
  ]);

  const [showOnlyUnfinished, setShowOnlyUnfinished] = useState(false);
  const [modalState, setModalState] = useState<'closed' | 'start' | 'template' | 'form'>('closed');
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'normal' as Priority
  });

  const templates: TaskTemplate[] = [
    {
      id: 'template-1',
      title: 'Code Review',
      defaults: {
        title: 'Review pull request',
        priority: 'high'
      }
    },
    {
      id: 'template-2',
      title: 'Fix Bug',
      defaults: {
        title: 'Fix critical bug',
        priority: 'high'
      }
    },
    {
      id: 'template-3',
      title: 'Schedule Meeting',
      defaults: {
        title: 'Schedule team meeting',
        priority: 'normal'
      }
    }
  ];

  const filteredTasks = showOnlyUnfinished
    ? tasks.filter(task => task.status === 'planned')
    : tasks;

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: 'finished' } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCreateFromTemplate = (template: TaskTemplate) => {
    setNewTask({
      title: template.defaults.title,
      priority: template.defaults.priority
    });
    setModalState('form');
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      status: 'planned',
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', priority: 'normal' });
    setModalState('closed');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Moje úkoly</h1>

      <div className="controls">
        <button className="new-task-button" onClick={() => setModalState('start')}>
          + Nový úkol
        </button>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnlyUnfinished}
            onChange={() => setShowOnlyUnfinished(!showOnlyUnfinished)}
          />
          Zobrazit pouze nedokončené úkoly
        </label>
      </div>
      <div className="divider"></div>
      <h2 className="section-title">Úkoly</h2>
       
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {modalState !== 'closed' && (
        <CreateTaskModal
          modalState={modalState}
          newTask={newTask}
          templates={templates}
          onClose={() => setModalState('closed')}
          onSetModalState={setModalState}
          onCreateFromTemplate={handleCreateFromTemplate}
          onTitleChange={(title) => setNewTask({...newTask, title})}
          onPriorityChange={(priority) => setNewTask({...newTask, priority})}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default App;