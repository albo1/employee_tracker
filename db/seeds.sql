INSERT INTO department (name)
VALUES
 ('Sales'),
 ('Marketing')
 ('Executive'),
 ('IT'),
 ('HR');

INSERT INTO role (title, salary, department_id)
VALUES
 ('Sales Rep', 85000, 1),
 ('Sales Team Lead', 105000, 1),
 ('Marketing Rep', 65000, 2),
 ('Marketing Lead', 80000, 2),
 ('CEO', 600000, 3),
 ('CFO', 235000, 3),
 ('Senior Software Engineer', 120000, 4),
 ('Junior Software Engineer', 90000, 4),
 ('Human Resource Assistant' 55000, 5),
 ('Human Resource Manager', 150000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
 ('Peter', 'Parker', 1, NULL),
 ('Jean', 'Grey', 1, 1),
 ('Barry', 'Allen', 1, 1),
 ('Kara', 'Zor-El', 2, NULL),
 ('Spike', 'Spiegel', 2, 2),
 ('Izuku', 'Midoriya', 2, 2),
 ('Mark', 'Grayson', 3, NULL),
 ('Toshinori', 'Yagi', 3, 3),
 ('Barbara', 'Gordon', 4, NULL),
 ('Rock', 'Lee', 4, 4),
 ('Saitama', 'Capedbaldy', 4, 4),
 ('Mikasa', 'Ackerman', 5, 5),
 ('Revy', 'Lee', 5, 5),
 ('Diana', 'Prince', 5, NULL);
 
 

