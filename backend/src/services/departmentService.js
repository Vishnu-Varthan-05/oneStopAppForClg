const { get_query_database } = require("../config/database_utils");

exports.getAllDepartments = async () => {
    try {
        const query = 
        `
            SELECT * from department 
        `;
        const result = get_query_database(query, []);
        return result;
    } catch (error) {
        throw new Error(`Error fetching departments ${error.message}`);
    }
}