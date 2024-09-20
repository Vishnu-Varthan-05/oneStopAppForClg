const timeTableService = require('../services/timetableService')

exports.getTimeTableController = async (req, res) => {
    const { studentYear, studentDepartment } = req.body;
    const { date } = req.query;
    try{
        const response = await timeTableService.getTimetable(studentYear, studentDepartment, date);
        res.status(201).json({message:"Timetable rretrieved successfully", data:response});
    }catch(error){
        res.status(400).json({message : error.message});
    }
};
