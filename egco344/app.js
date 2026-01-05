const express = require('express');

const app = express();
const PORT = 3000;

// Mock student data
const students = [
    { id: 'E001', name: 'John Doe', department: 'Computer Engineering', gpa: 3.8 },
    { id: 'E002', name: 'Jane Smith', department: 'Computer Engineering', gpa: 3.9 },
    { id: 'E003', name: 'Mike Johnson', department: 'Mechanical Engineering', gpa: 3.6 },
    { id: 'E004', name: 'Sarah Williams', department: 'Electrical Engineering', gpa: 3.7 },
    { id: 'E005', name: 'Tom Brown', department: 'Mechanical Engineering', gpa: 3.5 },
    { id: 'E006', name: 'Emily Davis', department: 'Electrical Engineering', gpa: 3.85 },
    { id: 'E007', name: 'Chris Wilson', department: 'Civil Engineering', gpa: 3.4 },
    { id: 'E008', name: 'Lisa Anderson', department: 'Computer Engineering', gpa: 3.75 }
];

app.use(express.json());

// API to get all students GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = {};
    
    students.forEach(student => {
        if (!groupedByDept[student.department]) {
            groupedByDept[student.department] = [];
        }
        groupedByDept[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
    });
    
    res.json(groupedByDept);
});

// API to get individual student GPA by student ID
app.get('/api/students/gpa/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Get all students GPA: GET http://localhost:${PORT}/api/students/gpa`);
    console.log(`Get student GPA by ID: GET http://localhost:${PORT}/api/students/gpa/:id`);
});