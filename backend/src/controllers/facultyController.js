const facultyService = require('../services/facultyService');

exports.createFaculty = async(req, res)=>{
    try{
        const response = await facultyService.createFaculty(req.body);
        res.status(201).json(response);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginFaculty = async (req, res) => {
  try {
    const { token } = await facultyService.authenticateFaculty(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
