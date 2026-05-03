const pool = require('../util/database');

exports.count = async () => {
    const {rows} = await pool.query('SELECT COUNT(*)::int AS total FROM games');
    return rows[0].total;
}