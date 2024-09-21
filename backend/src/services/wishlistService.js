const { post_query_database } = require("../config/database_utils");

exports.addWishlist = async (data) => {
  try {
    let query;
    let params;
    if (data.type === 'webinar' || data.type === 'event') {
      query = `
        INSERT INTO webeve_wishlist (student, webeve)
        VALUES (?, ?)
      `;
      params = [data.studentId, data.id];
    } else if (data.type === 'competition') {
      query = `
        INSERT INTO competition_wishlist (student, competition)
        VALUES (?, ?)
      `;
      params = [data.studentId, data.id];
    }
    const successMessage = await post_query_database(query, params);
    return successMessage;
  } catch (error) {
    throw new Error(`Error adding to wishlist: ${error.message}`);
  }
};

exports.removeWishlist = async (data) => {
  try {
    let query;
    let params;
    if (data.type === 'webinar' || data.type === 'event') {
      query = `
        DELETE FROM webeve_wishlist
        WHERE student = ? AND webeve = ?
      `;
      params = [data.studentId, data.id];
    } else if (data.type === 'competition') {
      query = `
        DELETE FROM competition_wishlist
        WHERE student = ? AND competition = ?
      `;
      params = [data.studentId, data.id];
    }
    const successMessage = await post_query_database(query, params);
    return successMessage;
  } catch (error) {
    throw new Error(`Error removing from wishlist: ${error.message}`);
  }
};
