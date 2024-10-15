const {
    getActiveCompetitions,
    getActiveWebinars,
    getActiveEvents,
    getAllCompetitions,
    getAllWebinars,
    getAllEvents,
} = require("../services/activeService");


exports.getActiveCompetitionsController = async (req, res) => {
    try {
        const result = await getActiveCompetitions();
        return res.status(200).json({
            message: 'Competition count retrieved successfully',
            data: result[0]?.competitionCount || 0, 
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve competition count: ${error.message}` });
    }
};


exports.getActiveWebinarsController = async (req, res) => {
    try {
        const result = await getActiveWebinars();
        return res.status(200).json({
            message: 'Webinar count retrieved successfully',
            data: result[0]?.webinarCount || 0,
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve webinar count: ${error.message}` });
    }
};

exports.getActiveEventsController = async (req, res) => {
    try {
        const result = await getActiveEvents();
        return res.status(200).json({
            message: 'Event count retrieved successfully',
            data: result[0]?.eventCount || 0, 
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve event count: ${error.message}` });
    }
};


exports.getAllCompetitionsController = async (req, res) => {
    const { facultyId, facultyDepartment } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const results = await getAllCompetitions(facultyId, page, limit);
        return res.status(200).json({
            message: 'Competitions retrieved successfully',
            data: results,
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve competitions: ${error.message}` });
    }
};


exports.getAllWebinarsController = async (req, res) => {
    const { facultyId, facultyDepartment } = req.body; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const results = await getAllWebinars(facultyId, page, limit);
        return res.status(200).json({
            message: 'Webinars retrieved succ   essfully',
            data: results,
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve webinars: ${error.message}` });
    }
};

exports.getAllEventsController = async (req, res) => {
    const { facultyId, facultyDepartment } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const results = await getAllEvents(facultyId, page, limit);
        return res.status(200).json({
            message: 'Events retrieved successfully',
            data: results,
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve events: ${error.message}` });
    }
};
