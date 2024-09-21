const { addWishlist, removeWishlist } = require("../services/wishlistService");

exports.addWishlistController = async (req, res) => {
  try {
    const data = req.body;
    if (data.remove) {
      const successMessage = await removeWishlist(data);
      return res.status(200).json({ message: successMessage });
    } else {
      const successMessage = await addWishlist(data);
      return res.status(200).json({ message: successMessage });
    }
  } catch (error) {
    return res.status(500).json({ message: `Failed to add/remove from wishlist: ${error.message}` });
  }
};
