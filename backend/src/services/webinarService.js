const { get_query_database } = require("../config/database_utils");

exports.getWebinar = async(student, year, department, page=1, limit=20) => {
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
            AND w.type = '0'
            ORDER BY w.date ASC
            LIMIT ? OFFSET ?
        `;
        
        const results = await get_query_database(query, [student, year, department, department, year, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving Webinars: ${error.message}`);
    }
}
