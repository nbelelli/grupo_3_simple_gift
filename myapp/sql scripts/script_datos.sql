USE simple_gift;
INSERT INTO categories (`name`) VALUES ('gaming');
INSERT INTO categories (`name`) VALUES ('mate');
INSERT INTO categories (`name`) VALUES ('cerveza');
INSERT INTO categories (`name`) VALUES ('musica');
INSERT INTO categories (`name`) VALUES ('gourmet');
INSERT INTO categories (`name`) VALUES ('deportes');
INSERT INTO products (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Box Patagonia', '5000', 'Box de degustacion de cervezas Patagonia', '5', 'beer1.webp', '1', '30', '3');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Nintendo Switch', '25000', 'Nintendo Switch + Super Mario Odysee', '0', 'gaming1.jpg', '1', '10', '1');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Box Matero', '7000', 'Termo Stanley, Mate y bolso matero', '25', 'stanley1.jpg', '1', '6', '2');

INSERT INTO products  (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Box Chocolatoso', '1000', 'Caja de chocolates', '10', 'chocolate1.jpg', '1', '35', '5');
INSERT INTO products (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Box Malbec', '5000', 'Box 2 vinos Malbec', '10', 'vino1.jpg', '1', '10', '5');
INSERT INTO products  (`name`, `price`, `description`, `discount`, `image`, `best_seller`, `stock`, `category_id`) VALUES ('Box broenies', '700', 'Box con brownies caseros', '0', 'VA1606544544986-brownie.jpeg', '1', '10', '5');


