import pool from '../config/db.js';

class Event {
    static async create({ image_path, title, comment, date }) {
         try {
            const { rows } = await pool.query(
                "INSERT INTO operation_bijoy (image_path, title, comment, date) VALUES ($1, $2, $3, $4) RETURNING *",
                [image_path, title, comment, date]
            );
            return rows[0];
        } catch (error) {
            console.error('Event creation error:', error);
            throw error;
        }
    }

    static async getAll() {
        const {rows} = await pool.query(
            "SELECT * FROM operation_bijoy ORDER BY date DESC"
        );
        return rows || [];
    }

    static async getRecent() {
        const { rows } = await pool.query(
        "SELECT * FROM operation_bijoy WHERE created_at > NOW() - INTERVAL '5 seconds'"
        );
        return rows || [];
    }

    static async delete(id) {
        const {rowsCount} = await pool.query(
            "DELETE FROM operation_bijoy WHERE id = $1",
            [id]
        );
        return rowsCount;
    }

    static async getImagePath(id) {
        const {rows} = await pool.query(
            "SELECT image_path FROM operation_bijoy WHERE id = $1",
            [id]
        );
        return rows[0]?.image_path;
    }
    static async getById(id) {
        const {rows} = await pool.query(
            "SELECT * FROM operation_bijoy WHERE id = $1",
            [id]
        );
        return rows[0];
    }
}

export default Event;