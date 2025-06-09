-- Remove all MySQL-specific comments and declarations at the top
-- admissions table
CREATE TABLE admissions (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL,
    institution VARCHAR(100) NOT NULL,
    course VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);
-- contactus table
CREATE TABLE contactus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
-- operation_bijoy table
CREATE TABLE operation_bijoy (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    title VARCHAR(100) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);
-- signup table
CREATE TABLE signup (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    is_admin BOOLEAN DEFAULT false
);
-- Insert data (modified for PostgreSQL)
INSERT INTO contactus (name, email, message, created_at)
VALUES (
        'Testing',
        'Testing@gmail.com',
        'Testing Testing Testing Testing',
        '2025-06-06 19:04:13'
    );
-- Create indexes
CREATE INDEX idx_operation_bijoy_date ON operation_bijoy(date);
CREATE INDEX idx_operation_bijoy_title ON operation_bijoy(title);