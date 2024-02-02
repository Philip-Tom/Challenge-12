USE employee_tracker_db;

-- Insert sample departments
INSERT INTO department (name) VALUES
('HR'),
('Engineering'),
('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
('Manager', 80000, 1),
('Software Engineer', 60000, 2),
('Accountant', 55000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Bob', 'Jones', 3, 1);
