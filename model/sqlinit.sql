DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS shoppingowl;
DROP VIEW IF EXISTS myshoppingowl;


CREATE TABLE users (
	pk_username VARCHAR(20) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	email VARCHAR(100) NOT NULL,
	token VARCHAR (64)
);

CREATE TABLE products (
	pk_productid SERIAL PRIMARY KEY,
	productname VARCHAR(50) NOT NULL,
	category VARCHAR (20) NOT NULL,
	price INT NOT NULL,
	description VARCHAR(200)
);

CREATE TABLE shoppingowl (
	fk_username VARCHAR(20),
	fk_productid SERIAL,
	quantity INT NOT NULL,
	PRIMARY KEY (fk_username, fk_productid),
	FOREIGN KEY (fk_username) REFERENCES users(pk_username),
	FOREIGN KEY (fk_productid) REFERENCES products(pk_productid)
	ON DELETE CASCADE
	ON UPDATE CASCADE
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
INSERT INTO users (pk_username, password, email) VALUES ("Neville", "sha1$42ef4224$1$2029d5dddffcae92827e323825a048e1d0c03bc5", "anja.bergmann@edu.fh-joanneum.at");
INSERT INTO users (pk_username, password, email) VALUES ("Sheld0r", "sha1$da8573a6$1$5fd9187eb0127164f2b21e27f383571e8e914a9a", "anja.bergmann@edu.fh-joanneum.at");



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



INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Doctor", 1, 100);
INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Doctor", 2, 2);
INSERT INTO shoppingowl (fk_username,fk_productid,quantity) VALUES ("Neville", 6, 3);