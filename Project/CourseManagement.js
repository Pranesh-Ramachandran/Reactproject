import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', code: '', credits: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async () => {
    if (newCourse.name && newCourse.code && newCourse.credits) {
      try {
        const response = await axios.post('http://localhost:4000/courses', { ...newCourse });
        setCourses([...courses, response.data]); // Add the new course to the state
        setNewCourse({ name: '', code: '', credits: '' }); // Reset the form after adding
      } catch (error) {
        console.error('Error adding course:', error);
      }
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/courses/${id}`);
      setCourses(courses.filter(course => course.id !== id)); // Remove course from state
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="course-management-container">
      <h2 className="course-management-title">Course Management</h2>

      <div className="course-form">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="code"
          placeholder="Course Code"
          value={newCourse.code}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="credits"
          placeholder="Credits"
          value={newCourse.credits}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Credits</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.credits}</td>
              <td>
                <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;