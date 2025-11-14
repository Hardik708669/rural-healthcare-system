-- Create DB
CREATE DATABASE IF NOT EXISTS telemed CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE telemed;

-- Users (patients, doctors, admins)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('patient','doctor','admin') DEFAULT 'patient',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient profiles (optional extra info)
CREATE TABLE patient_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  age INT,
  gender ENUM('male','female','other'),
  contact VARCHAR(50),
  address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT,
  scheduled_at DATETIME NOT NULL,
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Symptom reports (text input by user)
CREATE TABLE symptom_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  symptoms TEXT NOT NULL,
  severity ENUM('mild','moderate','severe') DEFAULT 'mild',
  ai_diagnosis TEXT,
  ai_recommendation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Wound reports (image + AI result)
CREATE TABLE wound_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  ai_analysis TEXT,
  ai_recommendation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Simple events / logs (optional)
CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level ENUM('info','warn','error') DEFAULT 'info',
  message TEXT,
  meta JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample inserts (users)
INSERT INTO users (name,email,password_hash,role) VALUES
('Test Patient','patient@example.com','$2b$10$placeholder-hash','patient'),
('Dr Alice','alice@example.com','$2b$10$placeholder-hash','doctor');

INSERT INTO patient_profiles (user_id,age,gender,contact,address) VALUES
(1,24,'male','+91-99999-00000','Satna, MP, India');
