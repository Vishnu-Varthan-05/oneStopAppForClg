const { getAllYears } = require("../services/yearService")

exports.getAllYears = async (req, res) => {
    try{
        const data = await getAllYears();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json("Error fetching years")
    }
}