const { getWebinar } = require("../services/webinarService");

exports.getWebinarController = async (req, res) => {
    const { studentYear, studentDepartment , studentId} = req.body;
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 20;

    try {
        const webinars = await getWebinar(studentId, studentYear, studentDepartment, page, limit);
        if (webinars.length === 0) {
            return res.status(200).json({ message: 'No webinars found', data:[]});
        }
        return res.status(200).json({ message: 'Webinars retrieved successfully', data: webinars });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve webinars: ${error.message}` });
    }
};
