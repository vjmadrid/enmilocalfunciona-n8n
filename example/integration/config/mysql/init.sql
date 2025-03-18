USE pizzadb;


CREATE TABLE IF not exists pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    ingredients JSON NOT NULL
);

INSERT INTO pizzas (id, name, price, stock, ingredients) VALUES
(1, 'Margarita', 8.5, 10, '["Tomate", "Mozzarella", "Albahaca"]'),
(2, 'Pepperoni', 9.0, 10, '["Tomate", "Mozzarella", "Pepperoni"]'),
(3, 'Cuatro Quesos', 10.0, 10, '["Tomate", "Mozzarella", "Gorgonzola", "Parmesano", "Cheddar"]'),
(4, 'Hawaiana', 9.5, 10, '["Tomate", "Mozzarella", "Jamón", "Piña"]'),
(5, 'BBQ Chicken', 11.0, 10, '["Salsa BBQ", "Mozzarella", "Pollo", "Cebolla"]'),
(6, 'Vegetariana', 9.0, 10, '["Tomate", "Mozzarella", "Pimientos", "Champiñones", "Aceitunas"]');

CREATE TABLE IF not exists orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_price DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF not exists order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    pizza_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE
);

-- Insertar un nuevo pedido
INSERT INTO orders (total_price) VALUES (27.5);

-- Obtener el ID del último pedido insertado
SET @last_order_id = LAST_INSERT_ID();

-- Insertar los ítems del pedido (ejemplo con 3 pizzas)
INSERT INTO order_items (order_id, pizza_id, quantity) VALUES
(@last_order_id, 1, 2),  -- 2 Margaritas
(@last_order_id, 3, 1),  -- 1 Cuatro Quesos
(@last_order_id, 5, 1);  -- 1 BBQ Chicken