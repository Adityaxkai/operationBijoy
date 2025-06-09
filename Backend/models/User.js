import pool from '../config/db.js';

class User {
    static async create({ name, email, password }) {
        const {rows} = await pool.query(
            "INSERT INTO signup (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        const {rows} = await pool.query(
            "SELECT * FROM signup WHERE email = $1",
            [email]
        );
        return rows[0];
    }

    static async findById(id) {
    const {rows} = await pool.query(
        "SELECT id, name, email, password, is_admin FROM signup WHERE id = $1",
        [id]
    );
    return rows[0];
}

    static async update(id, { name, email }) {
        await pool.query(
            "UPDATE signup SET name = $1, email = $2 WHERE Id = $3",
            [name, email, id]
        );
    }

    static async updatePassword(id, hashedPassword) {
        await pool.query(
            "UPDATE signup SET password = $1 WHERE Id = $2",
            [hashedPassword, id]
        );
    }
}

export default User;