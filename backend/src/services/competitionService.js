const { get_query_database, post_query_database } = require("../config/database_utils");

exports.getCompetition = async(student, year, department, page=1, limit=20)=>{
    try {
        const offset = (page-1)* limit;
        const query = `
            SELECT
                c.id,
                c.name,
                c.hostedby,
                c.importancelvl,
                CASE 
                    WHEN cw.student IS NOT NULL THEN 1
                    ELSE 0
                END AS isWishlist
            FROM competition c
            LEFT JOIN competition_wishlist cw
            ON c.id = cw.competition AND cw.student = ?
            WHERE(
                (c.year = ? AND c.department = ?) OR
                (c.year = 5 AND c.department = ?) OR
                (c.year = ? AND c.department = 24) OR
                (c.year = 5 AND c.department = 24)
            )
            AND c.expiresAt > NOW()
            ORDER BY c.importancelvl DESC
            LIMIT ? OFFSET ?
        `;
        const results = await get_query_database(query, [student, year, department, department, year, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving Competitions: ${error.message}`);
        
    }
}
