USE simple_gift;
INSERT INTO categories (`name`) VALUES ('gaming');
INSERT INTO categories (`name`) VALUES ('mate');
INSERT INTO categories (`name`) VALUES ('cerveza');
INSERT INTO categories (`name`) VALUES ('musica');
INSERT INTO categories (`name`) VALUES ('gourmet');
INSERT INTO categories (`name`) VALUES ('deportes');

INSERT INTO products (`name`, `price`, `description`, `discount`,  `best_seller`, `stock`, `category_id`) VALUES ('Box Patagonia', '5000', 'Box de degustacion de cervezas Patagonia', '5', '1', '30', '3');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `best_seller`, `stock`, `category_id`) VALUES ('Nintendo Switch', '25000', 'Nintendo Switch + Super Mario Odysee', '0',  '1', '10', '1');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `best_seller`, `stock`, `category_id`) VALUES ('Box Matero', '7000', 'Termo Stanley, Mate y bolso matero', '25',  '1', '6', '2');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `best_seller`, `stock`, `category_id`) VALUES ('Box Chocolatoso', '1000', 'Caja de chocolates', '10', '1', '35', '5');
INSERT INTO products (`name`, `price`, `description`, `discount`,  `best_seller`, `stock`, `category_id`) VALUES ('Box Malbec', '5000', 'Box 2 vinos Malbec', '10',  '1', '10', '5');
INSERT INTO products  (`name`, `price`, `description`, `discount`,  `best_seller`, `stock`, `category_id`) VALUES ('Box broenies', '700', 'Box con brownies caseros', '0',  '1', '10', '5');

INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('beer1.webp', 'cerveza', '1');
INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('gaming1.jpg', 'gaming', '2');
INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('stanley1.jpg', 'mate', '3');
INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('milka.webp', 'chocolate', '4');
INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('vino1.jpg', 'malbec', '5');
INSERT INTO images (`file_name`, `description`, `product_id`) VALUES ('VA1606544544986-brownie.jpeg', 'brownies', '6');

