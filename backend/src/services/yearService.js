const { get_query_database } = require("../config/database_utils")

exports.getAllYears = async () => {
    try {
        const query = `
            SELECT * FROM year
        `;
        const result = get_query_database(query, []);
        return result;
    } catch (error) {
        throw new Error(f`Error fetching years ${error.message}`)
    }
}