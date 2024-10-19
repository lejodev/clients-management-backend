Database creation
CREATE DATABASE DBFerreteria;

CREATE TABLE tbCliente (
	id_cliente INT PRIMARY KEY IDENTITY,
	nombre VARCHAR(50),
	direccion VARCHAR(50),
	telefono VARCHAR(50),
	email NVARCHAR(50)
);

CREATE TABLE tbCargo (
	id_cargo INT PRIMARY KEY IDENTITY,
	nombre_cargo VARCHAR(50)
);

CREATE TABLE tbVendedor (
	id_vendedor INT PRIMARY KEY IDENTITY,
	id_cargo INT,
	nombre VARCHAR(50),
	apellido VARCHAR(50),
	telefono VARCHAR(50),
	email NVARCHAR(50),
	CONSTRAINT fk_cargo FOREIGN KEY (id_cargo) REFERENCES tbCargo(id_cargo)
);

CREATE TABLE tbCategoria (
	id_categoria INT PRIMARY KEY IDENTITY,
	nombre VARCHAR(50),
	descripcion VARCHAR(50)
);

CREATE TABLE tbMarca (
	id_marca INT PRIMARY KEY IDENTITY,
	nombre VARCHAR(50)
);

CREATE TABLE tbProducto (
	id_producto INT PRIMARY KEY IDENTITY,
	id_categoria INT,
	nombre VARCHAR(50),
	descripcion VARCHAR(50),
	precio_compra DECIMAL(10, 2),
	precio_venta DECIMAL(10, 2),
	marca INT,
	CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES tbCategoria(id_categoria),
	CONSTRAINT fk_marca FOREIGN KEY (marca) REFERENCES tbMarca(id_marca)
);

CREATE TABLE tbVenta (
	id_venta INT PRIMARY KEY IDENTITY,
	fecha_venta DATETIME,
	id_cliente INT,
	id_vendedor INT,
	CONSTRAINT pk_cliente FOREIGN KEY (id_cliente) REFERENCES tbCliente(id_cliente),
	CONSTRAINT pk_vendedor FOREIGN KEY (id_vendedor) REFERENCES tbVendedor(id_vendedor)
);

CREATE TABLE producto_venta (
	id INT PRIMARY KEY IDENTITY,
	id_venta INT,
	id_producto INT,
	cantidad INT,
	precio_venta DECIMAL(10, 2),
	CONSTRAINT pk_venta FOREIGN KEY (id_venta) REFERENCES tbVenta(id_venta),
	CONSTRAINT pk_producto FOREIGN KEY (id_producto) REFERENCES tbProducto(id_producto)
);

CREATE TABLE tbInventario (
	id_inventario INT PRIMARY KEY IDENTITY,
	id_producto INT,
	cantidad INT,
	ultima_actualizacion DATETIME,
	CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES tbProducto(id_producto)
);


POPULATE THE DATABASE

-- Insert data into tbCliente
INSERT INTO tbCliente (nombre, direccion, telefono, email)
VALUES 
('Carlos Perez', 'Calle 10 #20-30', '3001234567', 'carlos.perez@gmail.com'),
('Ana Gomez', 'Avenida Siempre Viva #123', '3107654321', 'ana.gomez@hotmail.com'),
('Luis Torres', 'Carrera 15 #45-60', '3209876543', 'luis.torres@yahoo.com'),
('Marta Lopez', 'Calle 50 #100-20', '3001122334', 'marta.lopez@outlook.com'),
('Pedro Jimenez', 'Avenida del Libertador #200', '3105566778', 'pedro.jimenez@gmail.com');

-- Insert data into tbCargo
INSERT INTO tbCargo (nombre_cargo)
VALUES 
('Vendedor'),
('Gerente de ventas'),
('Asistente de ventas'),
('Encargado de almacén');

-- Insert data into tbVendedor
INSERT INTO tbVendedor (id_cargo, nombre, apellido, telefono, email)
VALUES 
(1, 'Miguel', 'Rodriguez', '3001112222', 'miguel.rodriguez@ferreteria.com'),
(2, 'Andrea', 'Lopez', '3105556666', 'andrea.lopez@ferreteria.com'),
(3, 'Juan', 'Martinez', '3208889999', 'juan.martinez@ferreteria.com'),
(4, 'Laura', 'Gonzalez', '3201234567', 'laura.gonzalez@ferreteria.com');

-- Insert data into tbCategoria
INSERT INTO tbCategoria (nombre, descripcion)
VALUES 
('Herramientas Eléctricas', 'Taladros, sierras eléctricas, y más'),
('Pinturas y Accesorios', 'Pinturas, rodillos, y brochas'),
('Materiales de Construcción', 'Cemento, arena, ladrillos'),
('Plomería', 'Tuberías, grifos, conexiones');

-- Insert data into tbMarca
INSERT INTO tbMarca (nombre)
VALUES 
('Bosch'),
('Stanley'),
('Pintuco'),
('Makita'),
('Black & Decker');

-- Insert data into tbProducto
INSERT INTO tbProducto (id_categoria, nombre, descripcion, precio_compra, precio_venta, marca)
VALUES 
(1, 'Taladro Eléctrico', 'Taladro eléctrico de 500W', 100.00, 150.00, 1), 
(1, 'Sierra Circular', 'Sierra circular de 1200W', 120.00, 180.00, 2), 
(2, 'Pintura Blanca', 'Pintura de pared blanca 1 galón', 40.00, 60.00, 3), 
(2, 'Rodillo para Pintar', 'Rodillo para pintar de 9 pulgadas', 10.00, 20.00, 2), 
(3, 'Cemento Gris', 'Saco de cemento gris 50kg', 20.00, 30.00, 2), 
(3, 'Arena Fina', 'Metro cúbico de arena fina', 50.00, 75.00, 3),
(4, 'Tubo PVC 1"', 'Tubo de PVC para agua 1 pulgada', 5.00, 10.00, 4),
(4, 'Grifo de Lavaplatos', 'Grifo de lavaplatos de acero inoxidable', 25.00, 40.00, 5);

-- Insert data into tbVenta
INSERT INTO tbVenta (fecha_venta, id_cliente, id_vendedor)
VALUES 
('2024-09-15', 1, 1),
('2024-09-16', 2, 2),
('2024-09-17', 3, 3),
('2024-09-18', 4, 4),
('2024-09-19', 5, 1);

-- Insert data into producto_venta
INSERT INTO producto_venta (id_venta, id_producto, cantidad, precio_venta)
VALUES 
(1, 1, 2, 150.00), -- 2 Taladros Eléctricos sold at $150 each
(1, 3, 1, 60.00),  -- 1 Pintura Blanca sold at $60
(2, 2, 1, 180.00), -- 1 Sierra Circular sold at $180
(2, 4, 3, 20.00),  -- 3 Rodillos for $20 each
(3, 5, 4, 30.00),  -- 4 Cemento Gris for $30 each
(3, 6, 2, 75.00),  -- 2 Arena Fina for $75 each
(4, 7, 10, 10.00), -- 10 Tubos PVC at $10 each
(5, 8, 1, 40.00);  -- 1 Grifo de Lavaplatos sold at $40

-- Insert data into tbInventario
INSERT INTO tbInventario (id_producto, cantidad, ultima_actualizacion)
VALUES 
(1, 50, '2024-09-01'),
(2, 30, '2024-09-01'),
(3, 100, '2024-09-01'),
(4, 200, '2024-09-01'),
(5, 500, '2024-09-01'),
(6, 1000, '2024-09-01'),
(7, 300, '2024-09-01'),
(8, 100, '2024-09-01');




