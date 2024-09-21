const { getEvent, getEventById } = require("../services/eventService");

exports.getEventController = async (req, res) => {
    const { studentYear, studentDepartment , studentId} = req.body;
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 20;

    try {
        const events = await getEvent(studentId, studentYear, studentDepartment, page, limit);
        if (events.length === 0) {
            return res.status(200).json({ message: 'No events found', data:[]});
        }
        return res.status(200).json({ message: 'events retrieved successfully', data: events });
    } catch (error) {
        return res.status(500).json({ message: `Failed to retrieve events: ${error.message}` });
    }
};

exports.getEventByIdController = async (req, res)  => {
    try {
        const id = req.params.id;
        console.log(id)
        const event = await getEventById(id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({message: "Event not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Error getting event"});
    }
}
