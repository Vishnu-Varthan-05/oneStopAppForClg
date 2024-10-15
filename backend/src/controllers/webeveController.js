const { postWebeve, updateWebeve, deleteWebeve } = require("../services/eventService");

exports.postWebeveController = async (req, res) => {
    const { name, conductedBy, venue, date, time, description, type, year, department, expiresAt } = req.body;
    const facultyId = req.body.facultyId;

    try {
        const result = await postWebeve(name, conductedBy, venue, date, time, description, type, year, department, expiresAt, facultyId);
        return res.status(201).json({ message: 'Event posted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: `Failed to post event: ${error.message}` });
    }
};

exports.updateWebeveController = async (req, res) => {
    const { id } = req.params;
    const { name, conductedBy, venue, date, time, description, type, year, department, expiresAt } = req.body;
    const facultyId = req.body.facultyId;

    try {
        const result = await updateWebeve(id, name, conductedBy, venue, date, time, description, type, year, department, expiresAt, facultyId);
        return res.status(200).json({ message: 'Event updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: `Failed to update event: ${error.message}` });
    }
};

exports.deleteWebeveController = async (req, res) => {
    const { id } = req.params;
    const facultyId = req.body.facultyId;

    try {
        const result = await deleteWebeve(id, facultyId);
        return res.status(200).json({ message: 'Event deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: `Failed to delete event: ${error.message}` });
    }
};