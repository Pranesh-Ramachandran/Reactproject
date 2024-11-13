import React from 'react';
import './HomePage.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <div className="homepage-container">
      <aside className="dashboard">
        <div className="logo">
          <h2>SIMS</h2> 
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/students">Student Records</Link>
            </li>
            <li>
              <Link to="/courses">Course Management</Link>
            </li>
            <li>
              <Link to="/analytics">Advanced Analytics</Link>
            </li>
         
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="homepage-main">
        <header className="homepage-header">
          <h1>Welcome to Student Information Management System</h1>
        </header>
        <section className="homepage-content">
          <div className="quick-access">
            <h2>Quick Access</h2>
            <div className="quick-access-cards">
              <Link to="/students" className="card">
                <h3>Student Records</h3>
                <p>Manage and view all student data.</p>
              </Link>
              <Link to="/courses" className="card">
                <h3>Course Management</h3>
                <p>Oversee courses and scheduling.</p>
              </Link>
              <Link to="/analytics" className="card">
                <h3>Advanced Analytics</h3>
                <p>View detailed reports and statistics.</p>
              </Link>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
