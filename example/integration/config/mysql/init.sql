USE pizzadb;


CREATE TABLE IF not exists Pizza (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    ingredients JSON NOT NULL
);


