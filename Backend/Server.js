const express = require('express');
const mysql = require('mysql2'); // Using mysql2 for better performance connector
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

saltRound=12
require('dotenv').config(); // This line reads the .env file


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

app.post('/signup',async (req,res)=>{
    const hashedPassword=await bcrypt.hash(req.body.password,saltRound);
    console.log("Original password:", req.body.password);
    console.log("Hashed password:", hashedPassword);
    const sql= "INSERT INTO signup(name,email,password) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
       hashedPassword
    ];
    db.query(sql,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.json(data);
    });
})

app.post('/contactus',(req,res)=>{
    const sql= "INSERT INTO contactus(name,email,message) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.message
    ];
    db.query(sql,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.json(data);
    });
})

app.post('/login',(req,res)=>{
    const sql= "SELECT Id,name,email,password FROM signup WHERE email = ?";
    const values = [
        req.body.email,
    ];
    db.query(sql,values,async (err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length > 0){
            const user=data[0];
            console.log("All columns from DB:", Object.keys(user));
            console.log("User object from DB:", user);

            console.log("Input password:", req.body.password);
            console.log("Stored hash:", user.password);

            const isPasswordValid=await bcrypt.compare(req.body.password.trim(),user.password);
            console.log("Password comparison result:", isPasswordValid);
            if(!user.Id) {
                return res.status(500).json({message: "User ID not found"});
            }
            if(isPasswordValid){
                const token=jwt.sign(
                    {id:user.Id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'1h'}//Token will expire in 1 hour
                );
                return res.json({
                    message:"Login successful",
                    token:token,
                    user:{
                        id:user.Id,
                        name:user.name,
                        email:user.email
                    }
                });
            }
        }else{
            return res.status(401).json({message:"Invalid credentials"});
        }
    });
})
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("Authorization header:", req.headers['authorization']);
    if (!token) {
        console.log("No token provided"); 
        return res.status(403).send("A token is required for authentication");}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err); 
            return res.status(401).send("Invalid Token");
        }
        console.log("Token decoded successfully, user ID:", decoded.id); 
        req.user = decoded;
        next();
    });
};

app.get('/profile',verifyToken, (req, res) => {
    console.log("User ID from token:", req.user.id);
    const sql = "SELECT name,email FROM signup WHERE Id = ?";
    db.query(sql, [req.user.id], (err, data) => {
        if (err) {
            console.error("Database error:", err); 
            return res.status(500).json(err);
        }
        if (data.length > 0) {
            console.log("User found:", data[0].email); 
            return res.json(data[0]);
        } else {
            console.log("User not found for ID:", req.user.id); 
            return res.status(404).json({ message: "User not found" });
        }
    });
});

// Update Profile
app.put('/profile', verifyToken, async (req, res) => {
    try {
      const { name, email } = req.body;
      const sql = "UPDATE signup SET name = ?, email = ? WHERE Id = ?";
      db.query(sql, [name, email, req.user.id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Profile updated successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Change Password
  app.post('/change-password', verifyToken, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // 1. Verify current password
      const userSql = "SELECT password FROM signup WHERE Id = ?";
      db.query(userSql, [req.user.id], async (err, data) => {
        if (err) return res.status(500).json(err);
        
        const isValid = await bcrypt.compare(currentPassword, data[0].password);
        if (!isValid) return res.status(401).json({ message: "Current password is incorrect" });
        
        // 2. Update to new password
        const hashedPassword = await bcrypt.hash(newPassword, saltRound);
        const updateSql = "UPDATE signup SET password = ? WHERE Id = ?";
        db.query(updateSql, [hashedPassword, req.user.id], (err, result) => {
          if (err) return res.status(500).json(err);
          return res.json({ message: "Password changed successfully" });
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});