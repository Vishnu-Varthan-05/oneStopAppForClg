const { get_query_database } = require("../config/database_utils")

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
        const results =await get_query_database(query, [year, department, date]);
        return results;
    }catch(error){
        throw new Error(`Error fetching timetable ${error.message}`);
    }
}