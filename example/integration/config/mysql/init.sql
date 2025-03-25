USE pizzeriadb;


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

-- -----------------------------------------
-- Primera orden: 2 Margaritas y 1 Pepperoni
-- -----------------------------------------

-- Insertar un nuevo pedido
INSERT INTO orders (total_price) VALUES (26.0); -- (8.5 * 2) + (9.0 * 1) = 26.0

-- Obtener el ID del último pedido insertado
SET @order1_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, pizza_id, quantity) VALUES
(@order1_id, 1, 2), -- 2 Margaritas 8.5
(@order1_id, 2, 1); -- 1 Pepperoni 9.0

-- -------------------------------------------
-- Segunda orden: 1 Cuatro Quesos y 1 Hawaiana
-- -------------------------------------------

-- Insertar un nuevo pedido
INSERT INTO orders (total_price) VALUES (19.5); -- (10.0 * 1) + (9.5 * 1) = 19.5

-- Obtener el ID del último pedido insertado
SET @order2_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, pizza_id, quantity) VALUES
(@order2_id, 3, 1), -- 1 Cuatro Quesos 10.0
(@order2_id, 4, 2);  -- 1 Hawaiana 9.5

-- ----------------------------
-- Tercera orden: 1 Vegetariana
-- ----------------------------

-- Insertar un nuevo pedido
INSERT INTO orders (total_price) VALUES (9.0); -- (9.0 * 1) = 9.0

-- Obtener el ID del último pedido insertado
SET @order3_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, pizza_id, quantity) VALUES
(@order3_id, 6, 1); -- 1 Vegetariana 9.0