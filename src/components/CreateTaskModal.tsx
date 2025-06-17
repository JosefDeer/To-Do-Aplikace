import React from 'react';
import type { TaskTemplate } from '../types';
import { TaskForm } from './TaskForm';
import { TemplateList } from './TemplateList';

interface CreateTaskModalProps {
  modalState: 'start' | 'template' | 'form';
  newTask: { title: string; priority: 'low' | 'normal' | 'high' };
  templates: TaskTemplate[];
  onClose: () => void;
  onSetModalState: (state: 'start' | 'template' | 'form') => void;
  onCreateFromTemplate: (template: TaskTemplate) => void;
  onTitleChange: (title: string) => void;
  onPriorityChange: (priority: 'low' | 'normal' | 'high') => void;
  onAddTask: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  modalState,
  newTask,
  templates,
  onClose,
  onSetModalState,
  onCreateFromTemplate,
  onTitleChange,
  onPriorityChange,
  onAddTask
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {modalState === 'start' && (
          <>
            <h2 className="modal-title">Vytvořit úkol</h2>
            <p className="modal-subtitle">Jak chcete začít?</p>

            <div className="modal-options">
              <button className="option-button" onClick={() => onSetModalState('form')}>
                Vytvořit nový
              </button>
              <button className="option-button2" onClick={() => onSetModalState('template')}>
                Vytvořit ze šablony
              </button>
            </div>

            <button className="cancel-button" onClick={onClose}>
              Zrušit
            </button>
          </>
        )}

        {modalState === 'template' && (
          <>
            <h2 className="modal-title">Vybrat šablonu</h2>
            <p className="modal-subtitle">Vyberte šablonu pro předvyplnění údajů o úkolu.</p>

            <TemplateList 
              templates={templates} 
              onSelect={onCreateFromTemplate} 
            />

            <div className="modal-actions">
              <button className="button" onClick={() => onSetModalState('start')}>
                Zpět
              </button>
              <button className="cancel-button" onClick={onClose}>
                Zrušit
              </button>
            </div>
          </>
        )}

        {modalState === 'form' && (
          <>
            <h2 className="modal-title">Detaily úkolu</h2>

            <TaskForm
              title={newTask.title}
              priority={newTask.priority}
              onTitleChange={onTitleChange}
              onPriorityChange={onPriorityChange}
            />

            <div className="modal-actions">
              <button className="button" onClick={() => onSetModalState('start')}>
                Zrušit
              </button>
              <button
                className="add-button"
                onClick={onAddTask}
                disabled={!newTask.title.trim()}
              >
                Přidat
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};