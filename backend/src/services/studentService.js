const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { get_query_database, post_query_database } = require('../config/database_utils');

exports.createStudent = async (studentData) => {
    const { name, regno, year, department, email, password } = studentData;

    try {
        const existingStudentQuery = 'SELECT email FROM student WHERE email = ?';
        const [existingStudentRows] = await get_query_database(existingStudentQuery, [email]);
        if (existingStudentRows.length > 0) throw new Error("Student already found");

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertStudentQuery = `
            INSERT INTO student (name, regno, year, department, email, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await post_query_database(insertStudentQuery, [name, regno, year, department, email, hashedPassword]);

        return { message: 'Student created successfully' };
    } catch (err) {
        throw new Error(`Error creating student: ${err.message}`);
    }
};

exports.authenticateStudent = async (email, password) => {
    try {
        const getStudentQuery = `
            SELECT id, year, department, password
            FROM student
            WHERE email = ?
        `;
        const [rows] = await get_query_database(getStudentQuery, [email]);
        if (rows.length === 0) throw new Error("No student found");

        const student = rows;
        
        if (!student.password) throw new Error("Password not found");
    
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) throw new Error("Wrong password");

        const token = jwt.sign({
            id: student.id,
            year: student.year,
            department: student.department,
        }, config.jwtSecret, { expiresIn: "7d" });

        return { token };
    } catch (err) {
        throw new Error(`Error authenticating student: ${err.message}`);
    }
};
