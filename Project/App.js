import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './Component/HomePage';
import StudentRecords from './Component/StudentRecords';
import CourseManagement from './Component/CourseManagement';
import AdvancedAnalytics from './Component/AdvancedAnalytics';

const App = () => {
  useEffect(() => {
    fetch("http://localhost:4000/users")  
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('Error fetching users:', err));
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentRecords />} />
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/analytics" element={<AdvancedAnalytics />} />
      </Routes>
    </Router>
  );
};

export default App;
