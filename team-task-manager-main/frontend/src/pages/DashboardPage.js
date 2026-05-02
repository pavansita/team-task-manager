import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await taskService.getDashboard();
      setStats(response.data.stats);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading dashboard...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <p className="stat-label">Projects</p>
              <p className="stat-value">{stats?.totalProjects || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <p className="stat-label">Total Tasks</p>
              <p className="stat-value">{stats?.totalTasks || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <p className="stat-label">Overdue</p>
              <p className="stat-value" style={{ color: '#ef4444' }}>
                {stats?.overdueTasks || 0}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <p className="stat-label">My Tasks</p>
              <p className="stat-value">{stats?.myTasks || 0}</p>
            </div>
          </div>
        </div>

        <div className="tasks-summary">
          <div className="summary-card">
            <h3>Tasks by Status</h3>
            <div className="status-list">
              <div className="status-item">
                <span className="status-badge todo">To Do</span>
                <span className="status-count">{stats?.tasksByStatus?.todo || 0}</span>
              </div>
              <div className="status-item">
                <span className="status-badge inprogress">In Progress</span>
                <span className="status-count">{stats?.tasksByStatus?.inProgress || 0}</span>
              </div>
              <div className="status-item">
                <span className="status-badge completed">Completed</span>
                <span className="status-count">{stats?.tasksByStatus?.completed || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-container h1 {
          color: #333;
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .stat-value {
          margin: 0.25rem 0 0 0;
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }

        .tasks-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .summary-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          margin-top: 0;
          color: #333;
        }

        .status-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 6px;
        }

        .status-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: bold;
          color: white;
        }

        .status-badge.todo {
          background: #94a3b8;
        }

        .status-badge.inprogress {
          background: #3b82f6;
        }

        .status-badge.completed {
          background: #10b981;
        }

        .status-count {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.1rem;
          color: #666;
        }
      `}</style>
    </>
  );
};

export default DashboardPage;
