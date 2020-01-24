--  -----------------------Populate Tables-----------------------------

INSERT INTO department (name)VALUES 
('Administration'), 
('Human Resources'), 
('Accounting'), 
('IT'), 
('Payroll');

 INSERT INTO role (title, salary, department_id) VALUES
 ('CEO', 100000.00, 1), 
 ('Biller', 45000.00, 3), 
 ('CTO', 80000, 4), 
 ('Payroll Manager',77000.00, 5), 
 ('Developer', 67000.00, 4), 
 ('Recruiter', 49000.00, 2);

  INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Smith', 1,null),
 ('Allen', 'Brown', 3, null), 
 ('Brandon', 'Hill', 2, 4), 
 ('Ashley', 'Penn', 2, 4), 
 ('Lisa', 'Dunn', 4, null), 
 ('Jacob', 'H', 5, 3), 
 ('Neb', 'T', 6, 4);