DROP TABLE cccat9.product;
DROP TABLE cccat9.coupon;
DROP SCHEMA cccat9;
CREATE SCHEMA cccat9;

CREATE TABLE cccat9.product (
  id_product INTEGER PRIMARY KEY,
  description TEXT,
  price NUMERIC
);

INSERT INTO cccat9.product (id_product, description, price) VALUES (1, 'A', 1000);
INSERT INTO cccat9.product (id_product, description, price) VALUES (2, 'B', 5000);
INSERT INTO cccat9.product (id_product, description, price) VALUES (3, 'C', 30);

CREATE TABLE cccat9.coupon (
  code TEXT PRIMARY KEY,
  percentage NUMERIC
);

INSERT INTO cccat9.coupon (code, percentage) VALUES ('MINUS20', 20);