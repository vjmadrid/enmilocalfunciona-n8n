USE shopdb;

CREATE TABLE IF not exists products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    created_on DATETIME
);

INSERT INTO products (id, name, price, created_on)
VALUES 
    (1, 'Product 1', 10, NOW()),
    (2, 'Product 2', 20.5, NOW()),
    (3, 'Product 3', 30, NOW()),
    (4, 'Product 4', 40.5, NOW()),
    (5, 'Product 5', 50, NOW());