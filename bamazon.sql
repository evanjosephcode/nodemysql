DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(100) NULL,
    product_name VARCHAR(255) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("A1401", "Hooli Pad Pro", "Electronics", 1499.99, 87);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("S1505", "Tomagotchi Retro Edition", "Electronics", 27.83, 1892);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("KUB1968", "2001: A Space Oddysey", "Blu-Ray", 13.99, 9666);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("FBDOOM404", "$100 credit Facebook Use for Farmville", "Gift Cards", 8.34, 98400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("TOIHU3", "Huggies Toilet paper, x20 pk", "Toiletries", 12.99, 67999);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DUM101", "How to code for Dummies, html advanced", "Book", 9.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("CAND3359", "Sour Patch Kids 6.5LB BAG", "Food", 6.50, 9999);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B4N4N4", "Banana - bundle of 6 banana", "Food", 3.33, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("SKUWEYE", "Gigli", "DVD", 0.34, 6900);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("F00", "Fidget Spinner", "Stupid but Awesome Accessories", 8.99, 45000);