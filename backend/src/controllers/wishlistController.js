const { addWishlist, removeWishlist, getWishlistedEvents, getWishlistedWebinars, getWishlistedCompetitions } = require("../services/wishlistService");

exports.addWishlistController = async (req, res) => {
  try {
    const data = req.body;
    if (data.remove) {
      const successMessage = await removeWishlist(data);
      res.status(200).json({ message: successMessage });
    } else {
      const successMessage = await addWishlist(data);
      res.status(200).json({ message: successMessage });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to add/remove from wishlist: ${error.message}` });
  }
};

exports.getWishlistedEventsController = async (req, res) => {
  try {
    const {studentId} = req.body;
    const events = await getWishlistedEvents(studentId);
    if (events) {
      res.status(200).json({data:events});
    }else{
      res.status(404).json('No data found')
    }
  } catch (error) {
     res.status(500).json(`Error fetching event`)
  }
}

exports.getWishlistedWebinarsController = async (req, res) => {
  try {
    const { studentId } = req.body;
    const webinars = await getWishlistedWebinars(studentId);
    if (webinars) {
      res.status(200).json({ data: webinars });
    } else {
      res.status(404).json('No data found');
    }
  } catch (error) {
    res.status(500).json(`Error fetching webinars: ${error.message}`);
  }
};

exports.getWishlistedCompetitionsController = async (req, res) => {
  try {
    const { studentId } = req.body;
    const competitions = await getWishlistedCompetitions(studentId);
    if (competitions) {
      res.status(200).json({ data: competitions });
    } else {
      res.status(404).json('No data found');
    }
  } catch (error) {
    res.status(500).json(`Error fetching competitions: ${error.message}`);
  }
};
