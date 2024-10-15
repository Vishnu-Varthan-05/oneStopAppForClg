const { getAllDepartments } = require("../services/departmentService")

exports.getAllDepartments = async (req, res) => {
    try {
        const data = await getAllDepartments();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Error fetching departments"})
    }
}