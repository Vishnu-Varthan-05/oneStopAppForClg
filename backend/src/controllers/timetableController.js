const timeTableService = require('../services/timetableService')

exports.getTimeTableController = async (req, res) => {
    const { studentYear, studentDepartment } = req.body;
    const { date } = req.query;
    try{
        const response = await timeTableService.getTimetable(studentYear, studentDepartment, date);
        res.status(200).json({message:"Timetable retrieved successfully", data:response});
    }catch(error){
        res.status(400).json({message : error.message});
    }
};

exports.getTimeTableByFaculty = async (req, res) => {
    const { studentYear, studentDepartment, date } = req.query;
    try{
        const response = await timeTableService.getTimetable(studentYear, studentDepartment, date);
        res.status(200).json({message:"Timetable retrieved successfully", data:response});
    }catch(error){
        res.status(400).json({message : error.message});
    }
};  

exports.postTimeTableController = async (req, res) => {
    const { year, department, date, from, to, description } = req.body;
    try {
        if (!year || !department || !date || !from || !to || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const response = await timeTableService.postTimetable(year, department, date, from, to, description);
        res.status(201).json({ message: "Timetable created successfully", data: response });
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};