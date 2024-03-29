DROP VIEW IF EXISTS myshoppingowl;
DROP TABLE IF EXISTS shoppingowl;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
	pk_username VARCHAR(20) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	email VARCHAR(100) NOT NULL,
	token VARCHAR (64)
);

CREATE TABLE products (
	pk_productid BIGINT UNSIGNED PRIMARY KEY,
	productname VARCHAR(50) UNIQUE NOT NULL,
	category VARCHAR (20) NOT NULL,
	price INT NOT NULL
);

CREATE TABLE shoppingowl (
	fk_username VARCHAR(20),
	fk_productid BIGINT UNSIGNED,
	quantity INT NOT NULL,
	PRIMARY KEY (fk_username, fk_productid),
	FOREIGN KEY (fk_username) REFERENCES users(pk_username)	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (fk_productid) REFERENCES products(pk_productid) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE VIEW myshoppingowl AS 
SELECT 
	fk_username,
	fk_productid,
	productname,
	quantity,
	price * quantity AS "totalprice"
FROM shoppingowl
LEFT OUTER JOIN products
	ON shoppingowl.fk_productid = products.pk_productid;


INSERT INTO users (pk_username, password, email) VALUES ("Doctor", "sha1$79bbc02a$1$2d906b452703267bf88c1d1dbdd6c4473270a5db", "anja.bergmann@edu.fh-joanneum.at");
INSERT INTO users (pk_username, password, email) VALUES ("Neville", "sha1$b21521f6$1$ad33a5fb7ee44f721e0d06a16e611cdb7bd0a545", "anja.bergmann@edu.fh-joanneum.at");
INSERT INTO users (pk_username, password, email) VALUES ("Sheld0r", "sha1$26281c49$1$e49e1ba6485ba3de6d3e4cef985e3a7d9a8a2469", "anja.bergmann@edu.fh-joanneum.at");



INSERT INTO products (pk_productid, productname, category, price) VALUES (1, "Snitch", "Balls", 100);
INSERT INTO products (pk_productid, productname, category, price) VALUES (2, "Quaffle", "Balls", 50);
INSERT INTO products (pk_productid, productname, category, price) VALUES (3, "Bludger", "Balls", 70);
INSERT INTO products (pk_productid, productname, category, price) VALUES (4, "Bludger (Set of two)", "Balls", 135);
INSERT INTO products (pk_productid, productname, category, price) VALUES (5, "How to Quidditch", "Books", 42);
INSERT INTO products (pk_productid, productname, category, price) VALUES (6, "Flying for dummies", "Books", 18);
INSERT INTO products (pk_productid, productname, category, price) VALUES (7, "Quidditch in a nutshell", "Books", 120);
INSERT INTO products (pk_productid, productname, category, price) VALUES (8, "Quidditch for dummies", "Books", 18);
INSERT INTO products (pk_productid, productname, category, price) VALUES (9, "Quidditch through the ages", "Books", 20);
INSERT INTO products (pk_productid, productname, category, price) VALUES (10, "Grey Gloves", "Clothing", 420);
INSERT INTO products (pk_productid, productname, category, price) VALUES (11, "Shoes", "Clothing", 130);
INSERT INTO products (pk_productid, productname, category, price) VALUES (12, "Black Gloves", "Clothing", 170);
INSERT INTO products (pk_productid, productname, category, price) VALUES (13, "Golden Jacket", "Clothing", 90);
INSERT INTO products (pk_productid, productname, category, price) VALUES (14, "Red Jacket", "Clothing", 90);
INSERT INTO products (pk_productid, productname, category, price) VALUES (15, "Broomtastic 5000", "Brooms", 5000);
INSERT INTO products (pk_productid, productname, category, price) VALUES (16, "Broomtastic Kids", "Brooms", 900);
INSERT INTO products (pk_productid, productname, category, price) VALUES (17, "Broomtastic Senior", "Brooms", 900);
INSERT INTO products (pk_productid, productname, category, price) VALUES (18, "Broomtastic Traveller", "Brooms", 1400);



INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Doctor", 1, 100);
INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Doctor", 2, 2);
INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Neville", 6, 3);