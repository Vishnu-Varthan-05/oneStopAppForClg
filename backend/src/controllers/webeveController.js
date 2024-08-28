const { getWebeve } = require('../services/webeveService');

exports.getWebeveController = async (req, res) => {
    const { studentYear, studentDepartment } = req.body;
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 20;

    try {
        const webeve = await getWebeve(studentYear, studentDepartment, page, limit);

        if (webeve.length === 0) {
            return res.status(200).json({ message: 'No web events found', data: [] });
        }

        return res.status(200).json(webeve);
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve web events: ${error.message}` });
    }
};
