const { get_query_database } = require("../config/database_utils");

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

exports.getCompetitionById = async(id) =>{
    try {
        const query = `
           SELECT 
                c.id,
                c.name,
                f.name AS postedBy,
                c.hostedby,
                c.importancelvl,
                c.reglink,
                CASE 
                    WHEN c.type = '0' THEN 'Internal'
                    ELSE 'External'
                END AS type,
                y.name AS year,
                d.name AS department
            FROM 
                competition c
            LEFT JOIN faculty f ON c.postedBy = f.id
            LEFT JOIN year y ON c.year = y.id
            LEFT JOIN department d ON c.department = d.id
            WHERE c.id = ?
        `
        const result = await get_query_database(query, [id]);
        return result;
    } catch (error) {
        throw new Error(`Error retrieving Competitions: ${error.message}`);
    }
}