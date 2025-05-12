const express = require('express');
const mysql = require('mysql2'); // Using mysql2 for better performance connector
const cors = require('cors');

const app = express();
const dbPort = 3309; // MySQL port
const serverPort = 8081; // Server port

// Create connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your password if set
    database: 'test',
    port: dbPort
});

// Connect to database checking 
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

app.use(cors());
app.use(express.json()); // Add JSON parsing middleware

// default api
app.get('/', (req, res) => {
    return res.json({ message: 'From backend side' });
});

// api users to get the data from the database that is mysql
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM operation_bijoy";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// SSE endpoint
app.get('/updates', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Important for SSE
    
    const sendUpdate = () => {
        db.query(
            'SELECT * FROM operation_bijoy WHERE created_at > NOW() - INTERVAL 5 SECOND',
            (err, newData) => {
                if (err) {
                    console.error('Database error:', err);
                    return;
                }
                if (newData.length > 0) {
                    res.write(`data: ${JSON.stringify(newData)}\n\n`);
                }
            }
        );
    };

    // Initial check
    sendUpdate();
    
    // Periodic checks
    const interval = setInterval(sendUpdate, 5000);
    
    req.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});