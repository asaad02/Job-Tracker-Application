USE template_db;

CREATE TABLE IF NOT EXISTS job (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    company_url VARCHAR(255),
    status VARCHAR(50),
    application_date TIMESTAMP,
    application_password VARCHAR(255),
    notes TEXT
);

-- Inserting test data
--INSERT INTO job (job_title, company, company_url, status, application_date, application_password, notes) VALUES 
--('Software Developer', 'Example Inc', 'http://example.com', 'APPLIED', NOW(), 'pass123', 'Interview scheduled'),
--('Project Manager', 'Startup Hub', 'http://startuphub.com', 'OFFERED', NOW(), 'pass456', 'Offer received, considering');