DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;


CREATE TABLE users (
	pk_username VARCHAR(20) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	email VARCHAR(100) NOT NULL,
	token VARCHAR (32)
);

CREATE TABLE products (
	pk_productid SERIAL PRIMARY KEY,
	productname VARCHAR(50) NOT NULL,
	category VARCHAR (20) NOT NULL,
	price INT NOT NULL,
	description VARCHAR(200)
);



INSERT INTO users (pk_username, password, email) VALUES ("Doctor", 1331, "anja.bergmann@edu.fh-joanneum.at");
INSERT INTO users (pk_username, password, email) VALUES ("Neville", 1331, "anja.bergmann@edu.fh-joanneum.at");
INSERT INTO users (pk_username, password, email) VALUES ("Sheld0r", 1331, "anja.bergmann@edu.fh-joanneum.at");



INSERT INTO products (productname, category, price) VALUES ("Snitch", "Balls", 100);
INSERT INTO products (productname, category, price) VALUES ("Quaffle", "Balls", 50);
INSERT INTO products (productname, category, price) VALUES ("Bludger", "Balls", 70);
INSERT INTO products (productname, category, price) VALUES ("Bludger (Set of two)", "Balls", 135);
INSERT INTO products (productname, category, price) VALUES ("How to Quidditch", "Books", 42);
INSERT INTO products (productname, category, price) VALUES ("Flying for dummies", "Books", 18);
INSERT INTO products (productname, category, price) VALUES ("Quidditch in a nutshell", "Books", 120);
INSERT INTO products (productname, category, price) VALUES ("Quidditch for dummies", "Books", 18);
INSERT INTO products (productname, category, price) VALUES ("Quidditch through the ages", "Books", 20);
INSERT INTO products (productname, category, price, description) VALUES ("Black Gloves", "Clothing", 420, "Made of high-quality dragon leather");
INSERT INTO products (productname, category, price) VALUES ("Shoes", "Clothing", 130);
INSERT INTO products (productname, category, price) VALUES ("Black Gloves", "Clothing", 170);
INSERT INTO products (productname, category, price) VALUES ("Golden Jacket", "Clothing", 90);
INSERT INTO products (productname, category, price) VALUES ("Red Jacket", "Clothing", 90);
INSERT INTO products (productname, category, price) VALUES ("Broomtastic 5000", "Brooms", 5000);
INSERT INTO products (productname, category, price) VALUES ("Broomtastic Kids", "Brooms", 900);
INSERT INTO products (productname, category, price) VALUES ("Broomtastic Senior", "Brooms", 900);
INSERT INTO products (productname, category, price) VALUES ("Broomtastic Traveller", "Brooms", 1400);