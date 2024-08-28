const { get_query_database } = require('../config/database_utils');

exports.getWebeve = async (year, department, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
        const sqlQuery = `
            SELECT 
                w.id,
                w.name,
                w.venue,
                w.date,
                w.time,
                w.expiresAt,
                f.name AS organiserName,
                yr.name AS yearName,
                d.name AS departmentName
            FROM webeve w
            JOIN faculty f ON w.organiser = f.id
            JOIN year yr ON w.year = yr.id
            JOIN department d ON w.department = d.id
            WHERE (
                (w.year = ? AND w.department = ?) OR
                (w.year = 5 AND w.department = ?) OR
                (w.year = ? AND w.department = 24) OR
                (w.year = 5 AND w.department = 24)
            )
            AND w.expiresAt > NOW()
            ORDER BY w.date ASC
            LIMIT ? OFFSET ?
        `;

        const results = await get_query_database(sqlQuery, [year, department, department, year, limit, offset]);
        return {results};
    } catch (error) {
        throw new Error(`Error retrieving Webeve records: ${error.message}`);
    }
};
