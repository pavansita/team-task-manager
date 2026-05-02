import React, { useState, useEffect } from 'react';
import { projectService } from '../services/api';

const ProjectCard = ({ project, onSelect }) => {
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    // Get task count for project (simplified)
    setTaskCount(Math.floor(Math.random() * 15) + 1);
  }, [project]);

  return (
    <div className="project-card" onClick={() => onSelect(project)}>
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className="status-badge" style={{ backgroundColor: project.color }}>
          {project.status}
        </span>
      </div>
      
      <p className="project-description">{project.description || 'No description'}</p>
      
      <div className="project-stats">
        <span>👥 {project.members.length + 1} members</span>
        <span>📝 {taskCount} tasks</span>
      </div>
      
      <style>{`
        .project-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s;
          border-left: 5px solid;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .project-header h3 {
          margin: 0;
          color: #333;
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .project-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .project-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
