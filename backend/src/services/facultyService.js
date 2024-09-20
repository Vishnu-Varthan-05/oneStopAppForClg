const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { get_query_database, post_query_database } = require('../config/database_utils');

exports.createFaculty = async (facultyData) => {
    const { name, facid, department, email, password } = facultyData;

    try {
        const existingFacultyQuery = 'SELECT email FROM faculty WHERE email = ?';
        const existingFacultyRows = await get_query_database(existingFacultyQuery, [email]);
        if (existingFacultyRows.length > 0) throw new Error("Faculty already found");

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertFacultyQuery = `
            INSERT INTO faculty (name, facid, department, email, password)
            VALUES (?, ?, ?, ?, ?)
        `;
        await post_query_database(insertFacultyQuery, [name, facid, department, email, hashedPassword]);

        return { message: 'Faculty created successfully' };
    } catch (err) {
        throw new Error(`Error creating faculty: ${err.message}`);
    }
};

exports.authenticateFaculty = async (email, password) => {
    try {
        const getFacultyQuery = `
            SELECT id, department, password
            FROM faculty
            WHERE email = ?
        `;
        const faculty = await get_query_database(getFacultyQuery, [email]);
        if (faculty.length === 0) throw new Error("No faculty found");

        const isMatch = await bcrypt.compare(password, faculty[0].password);
        if (!isMatch) throw new Error("Wrong password");

        const token = jwt.sign({
            id: faculty[0].id,
            department: faculty[0].department,
        }, config.jwtSecret, { expiresIn: "7d" });

        return { token };
    } catch (err) {
        throw new Error(`Error authenticating faculty: ${err.message}`);
    }
};
