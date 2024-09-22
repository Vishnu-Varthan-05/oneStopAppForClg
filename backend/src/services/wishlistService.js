const { post_query_database, get_query_database } = require("../config/database_utils");

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

exports.getWishlistedEvents = async (id) => {
  try {
    const query = `
      SELECT 
        e.id,
        e.name,
        e.conductedBy,
        e.venue,
        e.date,
        e.time,
        1 AS isWishlist
      FROM 
        webeve_wishlist ww
      LEFT JOIN webeve e ON ww.webeve = e.id
      WHERE 
        ww.student = ? AND e.type = '1'
    `
    const events = await get_query_database(query, [id]);
    return events;
  } catch (error) {
    throw new Error(`Error fetching Wishlisted Events ${error.message}`);
  }
}

exports.getWishlistedWebinars = async (id) => {
  try {
    const query = `
      SELECT 
        w.id,
        w.name,
        w.conductedBy,
        w.venue,
        w.date,
        w.time,
        1 AS isWishlist
      FROM 
        webeve_wishlist ww
      LEFT JOIN webeve w ON ww.webeve = w.id
      WHERE 
        ww.student = ? AND w.type = '0'
    `
    const webinars = await get_query_database(query, [id]);
    return webinars;
  } catch (error) {
    throw new Error(`Error fetching Wishlisted webinars ${error.message}`);
  }
}

exports.getWishlistedCompetitions = async (id) => {
  try {
    const query = `
      SELECT 
        c.id,
        c.name,
        c.hostedby,
        c.importancelvl,
        1 AS isWishlist
      FROM 
        competition_wishlist cw
      JOIN competition c 
        ON cw.competition = c.id
      WHERE 
        cw.student = ?;

    `;
    const competitions = get_query_database(query, [id]);
    return competitions;
  } catch (error) {
    throw new Error(`Error fetching Competitions ${error.message}`);
    
  }
}