-- Use the created database
USE bend;

-- Create the "Vulnerabilities" table
CREATE TABLE IF NOT EXISTS Vulnerabilities (
    vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
    vulnerability_name VARCHAR(255) NOT NULL,
    impact ENUM('High', 'Medium', 'Low') NOT NULL,
    description TEXT
);

-- Insert sample data into Vulnerabilities table
INSERT INTO Vulnerabilities (vulnerability_name, impact, description)
VALUES
    ('Reentrancy', 'High', 'Allows for malicious calls to external contracts.'),
    ('Overflow', 'Medium', 'Allows for integer overflows leading to unexpected behavior.'),
    ('Underflow', 'Low', 'Allows for integer underflows leading to unexpected behavior');

-- Create the "Reports" table
CREATE TABLE IF NOT EXISTS Reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_name VARCHAR(255) NOT NULL,
    audit_date DATE NOT NULL
);
INSERT INTO Reports (contract_name, audit_date)
VALUES
    ('ContractA', '2023-01-20'),
    ('ContractB', '2023-02-15');

-- Create the "ReportVulnerabilities" table (junction table)
CREATE TABLE IF NOT EXISTS ReportVulnerabilities (
    report_vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT,
    vulnerability_id INT,
    FOREIGN KEY (report_id) REFERENCES Reports(report_id),
    FOREIGN KEY (vulnerability_id) REFERENCES Vulnerabilities(vulnerability_id)
);

INSERT INTO ReportVulnerabilities (report_id, vulnerability_id)
VALUES
    (1, 1),
    (2, 2),
    (1, 3);