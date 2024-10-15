const { get_query_database } = require("../config/database_utils");

exports.getActiveCompetitions = async () => {
    try {
        const query = `
            SELECT 
                COUNT(*) AS competitionCount
            FROM competition
            WHERE competition.expiresAt > NOW()
        `;
        const result = await get_query_database(query);
        return result;
    } catch (error) {
        throw new Error(`Error retrieving Competitions: ${error.message}`);
    }
}

exports.getActiveWebinars = async () => {
    try {
        const query = `
            SELECT 
                COUNT(*) AS webinarCount
            FROM webeve
            WHERE webeve.type = '0' AND webeve.expiresAt > NOW()
        `;
        const result = await get_query_database(query);
        return result;
    } catch (error) {
        throw new Error(`Error retrieving Webinars: ${error.message}`);
    }
}

exports.getActiveEvents = async () => {
    try {
        const query = `
            SELECT 
                COUNT(*) AS eventCount
            FROM webeve
            WHERE webeve.type = '1' AND webeve.expiresAt > NOW()
        `;
        const result = await get_query_database(query);
        return result;
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
}

exports.getAllCompetitions = async (facultyId, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
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
                d.name AS department,
                CASE 
                    WHEN c.postedby = ? THEN 'true'
                    ELSE 'false'
                END AS can_edit
            FROM 
                competition c
            LEFT JOIN faculty f ON c.postedby = f.id
            LEFT JOIN year y ON c.year = y.id
            LEFT JOIN department d ON c.department = d.id
            WHERE c.expiresAt > NOW()
            ORDER BY c.expiresAt DESC
            LIMIT ? OFFSET ?
        `;
        const results = await get_query_database(query, [facultyId, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving all competitions: ${error.message}`);
    }
};

exports.getAllWebinars = async (facultyId, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
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
                d.name AS department,
                CASE 
                    WHEN e.organiser = ? THEN 'true'
                    ELSE 'false'
                END AS can_edit
            FROM 
                webeve e
            LEFT JOIN faculty f ON e.organiser = f.id
            LEFT JOIN year y ON e.year = y.id
            LEFT JOIN department d ON e.department = d.id
            WHERE 
                e.type = '0' AND e.expiresAt > NOW()  -- Filter active webinars
            ORDER BY e.date DESC
            LIMIT ? OFFSET ?
        `;
        const results = await get_query_database(query, [facultyId, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving all webinars: ${error.message}`);
    }
};

exports.getAllEvents = async (facultyId, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
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
                d.name AS department,
                CASE 
                    WHEN e.organiser = ? THEN 'true'
                    ELSE 'false'
                END AS can_edit
            FROM 
                webeve e
            LEFT JOIN faculty f ON e.organiser = f.id
            LEFT JOIN year y ON e.year = y.id
            LEFT JOIN department d ON e.department = d.id
            WHERE 
                e.type = '1' AND e.expiresAt > NOW()  -- Filter active events
            ORDER BY e.date DESC
            LIMIT ? OFFSET ?
        `;
        const results = await get_query_database(query, [facultyId, limit, offset]);
        return results;
    } catch (error) {
        throw new Error(`Error retrieving all events: ${error.message}`);
    }
};
