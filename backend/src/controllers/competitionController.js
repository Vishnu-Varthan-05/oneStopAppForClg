const { getCompetition } = require("../services/competitionService");

exports.getCompetitionController =  async(req, res)=>{
    const { studentYear, studentDepartment , studentId} = req.body;
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 20;
    try {
        const competitions = await getCompetition(studentId, studentYear, studentDepartment, page, limit);
        if (competitions.length == 0) {
            return res.status(200).json({message:'No competitions found', data:[]});
        }
        return res.status(200).json({message:'competitions retrieved successfully', data:competitions});
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve competitions: ${error.message}` });
    
    }
}