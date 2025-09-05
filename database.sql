-- School Management Database Schema
-- Run this script to create the database and table

CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('Delhi Public School', '123 Education Street', 'New Delhi', 'Delhi', '9876543210', 'info@dpsdelhi.com'),
('Mumbai International School', '456 Learning Avenue', 'Mumbai', 'Maharashtra', '9876543211', 'contact@mumbaiintl.com'),
('Bangalore Central School', '789 Knowledge Road', 'Bangalore', 'Karnataka', '9876543212', 'admin@bangalorecentral.com');
