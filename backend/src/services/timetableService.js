const { get_query_database, post_query_database } = require("../config/database_utils")

exports.getTimetable = async(year, department, date)=>{
    try{
        const query = `
            SELECT
                t.id,
                t.from,
                t.to,
                t.description
            FROM
                timetable t
            WHERE
                t.year = ? AND
                t.department = ? AND 
                t.date = ?
        `;
        const results = await get_query_database(query, [year, department, date]);
        return results;
    }catch(error){
        throw new Error(`Error fetching timetable ${error.message}`);
    }
}
exports.postTimetable = async (year, department, date, from, to, description) => {
    try {
        if (!year || !department || !date || !from || !to || !description) {
            throw new Error("All fields are required.");
        }
        const query = `
            INSERT INTO timetable(year, department, date, \`from\`, \`to\`, description) 
                VALUES (?, ?, ?, ?, ?, ?);
        `;
        const result = await post_query_database(query, [year, department, date, from, to, description], "Timetable created successfully");
        return result;
    } catch (error) {
        throw new Error(`Error posting timetable ${error.message}`);
    }
}
