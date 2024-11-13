import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentRecords.css';

const StudentRecords = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    grade: '',
    major: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/students');
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.grade && newStudent.major) {
      const id = String(Date.now()); 
      const studentToAdd = { id, ...newStudent }; 
      try {
        if (editing) {
          await axios.put(`http://localhost:4000/students/${currentStudentId}`, newStudent);
          fetchStudents(); 
        } else {
          await axios.post('http://localhost:4000/students', studentToAdd);
          fetchStudents();
        }
      } catch (error) {
        console.error('Error adding/updating student:', error);
      }
      setNewStudent({ id: '', name: '', grade: '', major: '' });
      setEditing(false);
      setCurrentStudentId(null);
    }
  };

  const handleEditStudent = (student) => {
    setEditing(true);
    setCurrentStudentId(student.id);
    setNewStudent(student);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/students/${id}`);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-records-container">
      <h2 className="student-records-title">Student Records</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="add-student-form">
        <h3>{editing ? 'Edit Student' : 'Add New Student'}</h3>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={newStudent.id}
            onChange={handleInputChange}
            required
            disabled={editing} // Disable ID field when editing
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="major"
            placeholder="Major"
            value={newStudent.major}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="add-btn">
            {editing ? 'Update Student' : 'Add Student'}
          </button>
        </form>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Major</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.major}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditStudent(student)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRecords;
