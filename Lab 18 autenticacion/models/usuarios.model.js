const pool = require('../util/database');
const bcrypt = require('bcrypt');

exports.User = class{
    constructor(username, name, password){
        this.username = username;
        this.name = name;
        this.password = password;
    }

    async save(){
        const hashedPassword = await bcrypt.hash(this.password, 12);
        const sql = `INSERT INTO Users (username, name, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, name`;
        const { rows} = await pool.query(sql,[this.username, this.name, hashedPassword]);
            return rows[0];
    }

    static async findByUsername(username){
        const sql = `SELECT id, username, password 
                    FROM users 
                    WHERE username = $1`;
        const { rows } = await pool.query(sql, [username]);
        return rows[0] || null;
    }
};