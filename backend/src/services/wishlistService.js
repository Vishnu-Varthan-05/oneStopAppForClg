const { post_query_database } = require("../config/database_utils");

exports.addWishlist = async (data) => {
  try {
    const query = `
      INSERT INTO webeve_wishlist (student, webeve)
      VALUES (?, ?)
    `;
    const params = [data.studentId, data.id];
    const successMessage = await post_query_database(query, params);
    return successMessage;
  } catch (error) {
    throw new Error(`Error adding to wishlist: ${error.message}`);
  }
};

exports.removeWishlist = async (data) => {
  try {
    const query = `
      DELETE FROM webeve_wishlist
      WHERE student = ? AND webeve = ?
    `;
    const params = [data.studentId, data.id];
    const successMessage = await post_query_database(query, params);
    return successMessage;
  } catch (error) {
    throw new Error(`Error removing from wishlist: ${error.message}`);
  }
};
