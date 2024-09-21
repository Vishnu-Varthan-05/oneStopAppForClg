const { get_query_database, post_query_database } = require("../config/database_utils");

exports.getEvent = async(student, year, department, page=1, limit=20) => {
    try {
        const offset = (page - 1) * limit;
        const query = `
            SELECT 
                w.id,
                w.name,
                w.conductedBy,
                w.venue,
                w.date,
                w.time,
                CASE 
                    WHEN wlw.student IS NOT NULL THEN 1
                    ELSE 0
                END AS isWishlist
            FROM webeve w
            LEFT JOIN webeve_wishlist wlw ON w.id = wlw.webeve AND wlw.student = ?
            WHERE (
                (w.year = ? AND w.department = ?) OR
                (w.year = 5 AND w.department = ?) OR
                (w.year = ? AND w.department = 24) OR
                (w.year = 5 AND w.department = 24)
            )
            AND w.expiresAt > NOW()
            AND w.type = '1'
            ORDER BY w.date ASC
            LIMIT ? OFFSET ?
        `;
        
        const results = await get_query_database(query, [student, year, department, department, year, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
}

exports.getEventById = async (id) => {
    try {
        const query = `
            SELECT
                e.id,
                e.name,
                f.name AS organiser,
                e.conductedBy,
                e.venue,
                e.date,
                e.time,
                e.description,
                y.name AS year,
                d.name AS department
            FROM 
                webeve e
            LEFT JOIN faculty f ON e.organiser = f.id
            LEFT JOIN year y ON e.year = y.id
            LEFT JOIN department d ON e.department = d.id
            WHERE 
                e.type = '1' AND e.id = ?
    `;
        const result = await get_query_database(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error fetching event ${error.message}`);
    }
}

exports.postWebeve = async (name, conductedBy, venue, date, time, description, type, year, department, expiresAt, facultyId) => {
    try {
        const query = `
            INSERT INTO webeve 
            (name, organiser, conductedBy, venue, date, time, description, type, year, department, expiresAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const results = await post_query_database(query, [name, facultyId, conductedBy, venue, date, time, description, type, year, department, expiresAt]);
        return results;
    } catch (error) {
        throw new Error(`Error posting webeve: ${error.message}`);
    }
}

exports.updateWebeve = async (id, name, conductedBy, venue, date, time, description, type, year, department, expiresAt, facultyId) => {
    try {
        const query = `
            UPDATE webeve 
            SET 
                name = ?, 
                conductedBy = ?, 
                venue = ?, 
                date = ?, 
                time = ?, 
                description = ?, 
                type = ?, 
                year = ?, 
                department = ?, 
                expiresAt = ?
            WHERE 
                id = ? AND 
                organiser = ?
        `;
        
        const results = await post_query_database(query, [name, conductedBy, venue, date, time, description, type, year, department, expiresAt, id, facultyId]);
        return results;
    } catch (error) {
        throw new Error(`Error updating webeve: ${error.message}`);
    }
}

exports.deleteWebeve = async (id, facultyId) => {
    try {
        const query = `
            DELETE FROM webeve 
            WHERE 
                id = ? AND 
                organiser = ?
        `;
        
        const results = await post_query_database(query, [id, facultyId]);
        return results;
    } catch (error) {
        throw new Error(`Error deleting webeve: ${error.message}`);
    }
}