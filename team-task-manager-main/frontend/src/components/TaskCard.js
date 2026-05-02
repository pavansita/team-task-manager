import React from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    urgent: '#7c3aed',
  };

  const statusColors = {
    todo: '#94a3b8',
    'in-progress': '#3b82f6',
    completed: '#10b981',
    cancelled: '#6b7280',
  };

  const getPriorityLabel = (priority) => {
    const labels = { low: '🟢', medium: '🟡', high: '🔴', urgent: '⚫' };
    return labels[priority] || '🟡';
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <span className="task-id">#{task._id.slice(-6)}</span>
      </div>

      <p className="task-description">{task.description || 'No description'}</p>

      <div className="task-meta">
        <span className="priority" style={{ backgroundColor: priorityColors[task.priority] }}>
          {getPriorityLabel(task.priority)}
        </span>
        <span className="status" style={{ backgroundColor: statusColors[task.status] }}>
          {task.status}
        </span>
        {task.dueDate && (
          <span className="due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {task.assignee && (
        <div className="assignee">
          Assigned to: <strong>{task.assignee.name}</strong>
        </div>
      )}

      <div className="task-actions">
        <button onClick={() => onUpdate(task)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn-delete">
          Delete
        </button>
      </div>

      <style>{`
        .task-card {
          background: white;
          border-radius: 8px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
          border-left: 4px solid #667eea;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .task-header h4 {
          margin: 0;
          color: #333;
          font-size: 1.1rem;
        }

        .task-id {
          color: #999;
          font-size: 0.8rem;
        }

        .task-description {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .task-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .priority, .status, .due-date {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          color: white;
        }

        .due-date {
          background: #8b5cf6;
          color: white;
        }

        .assignee {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.75rem;
        }

        .task-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-edit, .btn-delete {
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-edit {
          background: #3b82f6;
          color: white;
        }

        .btn-edit:hover {
          background: #2563eb;
        }

        .btn-delete {
          background: #ef4444;
          color: white;
        }

        .btn-delete:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
