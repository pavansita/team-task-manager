import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📋 Task Manager
        </Link>
        
        {user && (
          <div className="navbar-menu">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }
        
        .navbar-menu {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .nav-link:hover {
          opacity: 0.8;
        }
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-left: 1rem;
          border-left: 2px solid rgba(255,255,255,0.3);
        }
        
        .user-name {
          color: white;
          font-weight: 500;
        }
        
        .logout-btn {
          background: rgba(255,255,255,0.2);
          border: 1px solid white;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }
        
        .logout-btn:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
