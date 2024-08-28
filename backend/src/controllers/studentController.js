const studentService = require('../services/studentService');

exports.createStudent = async(req, res)=>{
    try{
        const response = await studentService.createStudent(req.body);
        res.status(201).json(response);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginStudent = async (req, res) => {
  try {
    const { token } = await studentService.authenticateStudent(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};