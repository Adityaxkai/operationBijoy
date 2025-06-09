import pool from '../config/db.js';

class Contact {
  static async create({ name, email, message }) {
    try {
      // Validate pool exists
      if (!pool) {
        throw new Error('Database pool is not initialized');
      }
      
       const { rows } = await pool.query(
      "INSERT INTO contactus (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]);
      return rows[0];
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error(`Failed to create contact: ${error.message}`);
    }
  }

static async getAll() {
  try {
    if (!pool) {
      throw new Error('Database pool is not initialized');
    }
    
    console.log('Executing contact query...');
    const {rows} = await pool.query(
    "SELECT id, name, email, message, created_at FROM contactus ORDER BY created_at DESC"
    );
    console.log('Query successful, rows found:', rows.length);
    return rows;
  } catch (error) {
    console.error('Detailed database error:', {
      message: error.message,
      sql: error.sql,
      code: error.code,
      errno: error.errno
    });
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }
}

  static async delete(id) {
  try {
    if (!pool) {
      throw new Error('Database pool is not initialized');
    }
    
    if (!id) {
      throw new Error('Contact ID is required');
    }
    
    const { rowCount } = await pool.query(
      "DELETE FROM contactus WHERE id = $1",
      [id]
    );
    
    if (rowCount === 0) {
      throw new Error('No contact found with that ID');
    }
    
    return rowCount;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}

  static async getById(id) {
    try {
      // Validate pool exists
      if (!pool) {
        throw new Error('Database pool is not initialized');
      }
      
      const {rows} = await pool.query(
        "SELECT id, name, email, message, created_at FROM contactus WHERE id = $1",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('Error fetching contact by ID:', error);
      throw new Error(`Failed to fetch contact: ${error.message}`);
    }
  }
}

export default Contact;