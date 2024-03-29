CREATE TABLE bill (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  address      VARCHAR(255),
  create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  pay_method   VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  total        DOUBLE NOT NULL,
  username     VARCHAR(255)
);

CREATE TABLE category (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  create_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name        VARCHAR(255) NOT NULL
);

CREATE TABLE product (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  album       VARCHAR(255),
  connect     VARCHAR(255),
  create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(255),
  material    VARCHAR(255),
  model       VARCHAR(255),
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name        VARCHAR(255),
  price       DOUBLE NOT NULL,
  quantity    INT,
  style       VARCHAR(255),
  category_id BIGINT,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE bill_detail (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  color         VARCHAR(255) NOT NULL,
  product_price DOUBLE NOT NULL,
  quantity      INT NOT NULL,
  size          VARCHAR(255) NOT NULL,
  bill_id       BIGINT,
  product_id    BIGINT,
  CONSTRAINT fk_billDetail_bill FOREIGN KEY (bill_id) REFERENCES bill (id),
  CONSTRAINT fk_billDetail_product FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE image (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  content    VARCHAR(255),
  main       INT,
  product_id BIGINT,
  CONSTRAINT fk_image_product FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE role (
  id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE shopping_cart (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  total       DOUBLE NOT NULL
);

CREATE TABLE cart_item (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  color            VARCHAR(255) NOT NULL,
  product_price    DOUBLE NOT NULL,
  quantity         INT NOT NULL,
  size             VARCHAR(255) NOT NULL,
  product_id       BIGINT,
  shopping_cart_id BIGINT,
  CONSTRAINT fk_cartItem_product FOREIGN KEY (product_id) REFERENCES product (id),
  CONSTRAINT fk_cartItem_shoppingCart FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id)
);

CREATE TABLE user (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  address          VARCHAR(255),
  create_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  password         VARCHAR(255),
  phone_number     VARCHAR(255),
  username         VARCHAR(255),
  shopping_cart_id BIGINT,
  CONSTRAINT uk_user_shopping_cart_id UNIQUE (shopping_cart_id),
  CONSTRAINT fk_user_shopping_cart FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id)
);

CREATE TABLE favourite_products (
  user_id     BIGINT NOT NULL,
  products_id BIGINT NOT NULL,
  CONSTRAINT uk_favourite_products_products_id UNIQUE (products_id),
  CONSTRAINT fk_favourite_products_product FOREIGN KEY (products_id) REFERENCES product (id),
  CONSTRAINT fk_favourite_products_user FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE refreshtoken (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  expire_date TIMESTAMP NOT NULL,
  token       VARCHAR(255) NOT NULL,
  user_id     BIGINT,
  CONSTRAINT uk_refreshtoken_token UNIQUE (token),
  CONSTRAINT fk_refreshtoken_user FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES user (id),
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO role values (1, 'ADMIN');
INSERT INTO role values (2, 'USER');

INSERT INTO category (id, name) VALUES (1, 'Áo sơ mi');
INSERT INTO category (id, name) VALUES (2, 'Jumpsuit');
INSERT INTO category (id, name) VALUES (3, 'Đầm');
INSERT INTO category (id, name) VALUES (4, 'Quần Dài');
INSERT INTO category (id, name) VALUES (5, 'Chân váy');
INSERT INTO category (id, name) VALUES (6, 'Quần Short');
INSERT INTO category (id, name) VALUES (7, 'Set bộ');
INSERT INTO category (id, name) VALUES (8, 'Áo Dài');
INSERT INTO category (id, name) VALUES (9, 'Quần Jeans');

INSERT INTO `product` (`id`, `name`, `category_id`, `price`, `quantity`, `description`, `material`, `style`, `album`, `model`, `connect`) VALUES
('1', 'ĐẦM HỌA TIẾT TAY RỦ D43262', '3', '2599000.00000', '40', '', 'Vải tổng hợp cao cấp', 'Đầm thiết kế dáng chữ A dài qua gối, tay rủ, tone màu trắng kết hợp họa tiết in', 'NEM NEW', 'Mặc sản phẩm size 2', ''),
('2', 'ĐẦM SUÔNG ĐỎ TAY RỦ D02002', '3', '1399000.00000', '60', '', 'Vải tổng hợp cao cấp', 'Đầm thiết kế dáng suông dài qua gối, tay rủ, tone màu đỏ kết hợp họa tiết hoa thêu', 'NEM NEW', 'Mặc sản phẩm size 2', ''),
('3', 'SƠ MI CỔ NƠ SM18212', '1', '2799000.00000', '160', '', 'Vải tổng hợp cao cấp', 'Áo sơ mi thiết kế tay lỡ, tone màu hồng nhat, cổ phối nơ thắt cách điệu', 'NEM NEW', 'Mặc sản phẩm size 2', 'Chân váy Z08302'),
('4', 'QUẦN CÔNG SỞ Q43242', '4', '429000.00000', '70', '', 'Vải tổng hợp cao cấp', 'Quần dài thiết kế cạp cao, ống đứng, tone màu đen trơn, xếp li phía trước', 'NEM NEW', 'mặc sản phẩm size 2', 'áo SM42552'),
('5', 'ÁO DÀI ĐÍNH HOA AD09182', '8', '1899000.00000', '80', 'Phù hợp: lễ tết, cưới hỏi, đi sự kiện, tạo vẻ trẻ trung, duyên dáng cho người mặc.', 'Vải tổng hợp cao cấp', 'Áo dài thiết kế tay bồng, tone màu trắng, kết hợp họa tiết hoa thêu đính', 'NEM NEW', 'Mặc sản phẩm size 2', 'Quần Q09192'),
('6', 'SƠ MI OVERSIZE SM19562', '1', '999000.00000', '160', 'Lưu ý: sản phẩm không kèm đai', 'Vải tổng hợp cao cấp', 'Áo sơ mi thiết kế dáng rộng, cổ bẻ, tone màu xanh ', 'NEM NEW', 'mặc sản phẩm size 2', 'Quần Q67052'),
('7', 'CHÂN VÁY REN XẾP LI Z19322', '5', '899000.00000', '20', 'Mặc mát, thích hợp vào mùa hè', 'Vải ren cao cấp', '​chân váy midi xếp li dài qua gối,  tone màu xanh đậm', 'NEM NEW', 'mặc sản phẩm size 2', 'Áo SM19312'),
('8', 'ĐẦM LIỀN ĐÍNH HOA 3D D20362', '3', '1399000.00000', '40', '', 'Vải tổng hợp cao cấp', 'Đầm liền thiết kế dáng ôm dài qua gối, tay bồng, tone màu xanh trơn kết hợp hoa 3D đính nổi', 'NEM NEW', 'Mặc sản phẩm size 2', ''),
('9', 'QUẦN SHORT XẺ GẤU Q20572', '6', '2599000.00000', '80', '', 'Vải tổng hợp cao cấp', 'Quần short thiết kế cạp cao, cạp cách điệu, tone màu vàng trơn', 'NEM NEW', 'mặc sản phẩm size 2', 'áo TS60012'),
('10', 'SƠ MI TRẮNG ĐÍNH HOA NỔI D19412', '1', '799000.00000', '80', '', 'Vải tổng hợp cao cấp', 'Áo thiết kế dài tay, cổ bẻ, tone màu trắng kết hợp hoa 3D đính nổi', 'NEM NEW', 'Mặc sản phẩm size 2', 'Chân váy Z20602'),
('11', 'BỘ MẶC NHÀ HOA XANH HW03652', '7', '599000.00000', '60', '', 'Vải tổng hợp cao cấp', 'Bộ mặc nhà bao gồm áo không tay và quần short, kết hợp họa tiết hoa xanh', 'NEM NEW', 'mặc sản phẩm size 2', ''),
('12', 'JUMPSUIT CHẤM BI DÁNG DÀI J04882', '2', '1399000.00000', '60', '', 'Vải tổng hợp cao cấp', 'Jumpsuit thiết kế ống rộng, cổ bẻ, tone màu đen kết hợp họa tiết chấm bi', 'NEM NEW', 'mặc sản phẩm size 2', ''),
('13', 'ÁO DÀI THÊU HOA AD09942', '8', '1759000.00000', '80', 'Phù hợp: lễ tết, cưới hỏi, đi sự kiện, tạo vẻ trẻ trung, duyên dáng cho người mặc.', 'Vải tổng hợp cao cấp', 'Áo dài thiết kế dài tay, tone màu vàng kết hợp họa tiết hoa thêu', 'NEM NEW', 'Mặc sản phẩm size 2', 'Quần Q10882'),
('14', 'JUMPSUIT DÁNG NGẮN J01302', '2', '799000.00000', '50', 'Phù hợp: đi làm, sự kiện, hay đi dạo phố, tạo vẻ trẻ trung nữ tính cho người mặc.', 'Vải tổng hợp cao cấp', 'Jumpsuit thiết kế dáng ngắn, không tay, cổ đáp chéo, tone màu đỏ kết hợp họa tiết hoa nhí', 'NEM NEW', 'mặc sản phẩm size 2', ''),
('15', 'ĐẦM REN TAY RỦ D19502', '3', '2599000.00000', '20', 'Lưu ý: sản phẩm không kèm đai', 'vải ren cao cấp', 'đầm thiết kế dáng chữ A dài qua gối, cổ tròn,tay rủ, tone màu nâu be trơn', 'NEM NEW', 'mặc sản phẩm size 2', ''),
('16', 'ÁO DÀI HỌA TIẾT AD15902', '8', '1499000.00000', '100', '', 'Vải tổng hợp cao cấp', 'Áo dài thiết kế dài tay, tone nền màu nâu kết hợp họa tiết in nổi bật', 'NEM NEW', 'mặc sản phẩm size 2', 'quần Q17292'),
('17', 'ÁO DÀI HOA AD10872', '8', '1499000.00000', '80', '', 'Vải tổng hợp cao cấp', 'Áo dài thiết kế tone màu xanh kết hợp họa tiết hoa in', 'NEM NEW', 'Mặc sản phẩm size 2', 'Quần Q09102'),
('18', 'ĐẦM ĐEN TAY BỒNG D19162', '3', '1399000.00000', '20', 'Lưu ý: sản phẩm không kèm đai', 'Vải tổng hợp cao cấp', 'Đầm thiết kế dáng chữ A dài qua gối, tone màu đen trơn', 'NEM', 'mặc sản phẩm size 2', ''),
('19', 'JUMPSUIT CỔ VEST J09262', '2', '999000.00000', '20', 'Phù hợp: đi làm, sự kiện, hay đi dạo phố, tạo vẻ trẻ trung nữ tính cho người mặc.', 'Vải tổng hợp cao cấp', 'Jumpsuit thiết kế dáng ngắn, tone màu xanh trơn, cổ bẻ 2 ve', 'NEM NEW', 'Mặc sản phẩm size 2', ''),
('20', 'SƠ MI REN SM00292', '1', '799000.00000', '160', 'Lưu ý: sản phẩm không kèm đai', 'vải ren cao cấp', 'Áo thiết kế vai bồng, cổ tròn, tone màu đen trơn ', 'NEM', 'Mặc sản phẩm size 2', 'Quần Q00302'),
('21', 'JUMPSUIT HOA DÁNG NGẮN J01292', '2', '999000.00000', '50', 'Phù hợp: đi làm, sự kiện, hay đi dạo phố, tạo vẻ trẻ trung nữ tính cho người mặc.', 'Vải tổng hợp cao cấp', 'Jumpsuit thiết kế dáng ngắn, nền màu trắng trơn kết hợp họa tiết hoa in nổi bật, eo phối đai cùng tone màu', 'NEM NEW', 'Mặc sản phẩm size 2', ''),
('22', 'ÁO DÀI NHUNG ĐÍNH HOA 3D AD12852', '8', '449700.00000', '50', '', 'Vải nhung cao cấp', 'Áo dài thiết kế tone màu đỏ đô, phần cổ đính voan, đính hoa 3D bản to', 'NEM NEW', 'mặc sản phẩm size 2', 'quần Q12862'),
('23', 'QUẦN JEANS CẠP PHỐI CHUN Q67012', '9', '599000.00000', '80', 'Phù hợp đi làm, đi sự kiện, hay đi dạo phố, tạo vẻ trẻ trung, hiện đại cho người mặc.', 'Vải jeans cao cấp', 'Quần jeans thiết kế dáng ống đứng, độ dài trên mắt cá chân, cạp phối chun', 'NEM NEW', 'mặc sản phẩm size 2', 'áo phông TS60042'),
('24', 'ÁO THIẾT KẾ TAY BỒNG SM40122', '1', '399000.00000', '80', '', 'Vải tổng hợp cao cấp', 'Áo thiết kế tay bồng, tone màu xanh nhạt, cài khuy bọc phía trước', 'NEM NEW', 'Mặc sản phẩm size 2', 'Chân váy Z40112');

INSERT INTO `image` (`content`, `main`, `product_id`) VALUES
('https://product.hstatic.net/200000182297/product/6_ad1ca12b64114ab88aeb0620fcafa123_master.jpg', 1, '4'),
('https://product.hstatic.net/200000182297/product/23_f8ddcce6b6ba41ac97692dbd23dece40_master.jpg', 1, '7'),
('https://product.hstatic.net/200000182297/product/15_d1d4160aa62a48f3bd1ab2e9b36b1c33_master.jpg', 1, '9'),
('https://product.hstatic.net/200000182297/product/j013021962212020474p799dt_2__4810418d2d3b448ba66971423d913652_master.jpg', 0, '14'),
('https://product.hstatic.net/200000182297/product/43_49842837958449f2bb5ed995a1127341_master.jpg', 1, '17'),
('https://product.hstatic.net/200000182297/product/ad159021582215000458p1499dt_q172921782214030401p699dt_20c6a9de88b549f59299d02c153d1986_master.jpg', 0, '16'),
('https://product.hstatic.net/200000182297/product/j013021962212020474p799dt_4__d995b38f1beb425ab4f4fde5014f5c0a_master.jpg', 0, '14'),
('https://product.hstatic.net/200000182297/product/ts600121902332030462p299dt_q205921702312050457p599dt_3__5a24d365f0d7495ebd12009d3d3a4a35_master.jpg', 0, '9'),
('https://product.hstatic.net/200000182297/product/d203621412312160405p1399dt_f66f0be27d164b0d91d9ae2f9719178c_master.jpg', 0, '8'),
('https://product.hstatic.net/200000182297/product/210_bf511813b79a410a9916467e7383c698_master.jpg', 1, '23'),
('https://product.hstatic.net/200000182297/product/d191621412352110401p1399dt_1__0bfa8db0b6b849768dcf5fd858b81d5b_master.jpg', 0, '18'),
('https://product.hstatic.net/200000182297/product/ad099421582223030658p1759dt_q108821782223050401p599dt_4__1ac4f97cd7aa4589893e9c6eeb7f9da9_master.jpg', 0, '13'),
('https://product.hstatic.net/200000182297/product/2_9d881f3f665344f1bf3777735cf334e3_master.jpg', 1, '1'),
('https://product.hstatic.net/200000182297/product/2_6958d81e54a642a6a155b32a20e1979d_master.jpg', 1, '16'),
('https://product.hstatic.net/200000182297/product/j012921962212400426p999dt_2__05cfd5f308624bc39da52697da626ae7_master.jpg', 0, '21'),
('https://product.hstatic.net/200000182297/product/d020021412362420674p1399dt_ef8bcfa3fa8f4fd0b686922e0d5d8ba0_master.jpg', 0, '2'),
('https://product.hstatic.net/200000182297/product/ad159021582215000458p1499dt_q172921782214030401p699dt_2__ab69249b7fb1455aa70ae0d996b15326_master.jpg', 0, '16'),
('https://product.hstatic.net/200000182297/product/ts600121902332030462p299dt_q205921702312050457p599dt_ce1975bcae5048159765387b262262d6_master.jpg', 0, '9'),
('https://product.hstatic.net/200000182297/product/ad128521582224720458p1499dt_q128621782224040418p699dt_4__377f8320ebe2418a823a35e28f8a8b19_master.jpg', 0, '22'),
('https://product.hstatic.net/200000182297/product/sm182121222332420401p799dt_z083021522213130674p699dt_1__7c836f4b1b1b4248a437dbe3a184e706_master.jpg', 0, '3'),
('https://product.hstatic.net/200000182297/product/ak401221312352160457p399dt_z401121542382160457p399dt_4__2388328dd9f545fb96efce4fe24c11eb_master.jpg', 0, '24'),
('https://product.hstatic.net/200000182297/product/d432621412382000274p599dt_21632c5dc1fd4cfd96636b43c08dbf2c_master.jpg', 0, '1'),
('https://product.hstatic.net/200000182297/product/19_22ea2a2036b041a3a3a35f71834dacd9_master.jpg', 1, '21'),
('https://product.hstatic.net/200000182297/product/sm425521232231000257p429dt_q432421722322110474p429dt_3f7ad9cb48df4c29a3c4f81fc3e67b96_master.jpg', 0, '4'),
('https://product.hstatic.net/200000182297/product/ad091821582213030401p1899dt_q091921782223030401p599dt_1__556aa0e67f50405d9ad190d4847c132e_master.jpg', 0, '5'),
('https://product.hstatic.net/200000182297/product/j092621962213160474p999dt_4__66d621f6e94f4812916efb81030738d8_master.jpg', 0, '19'),
('https://product.hstatic.net/200000182297/product/1_ee5c7dc3014e48f49fbbbaf7f11b1a9e_master.jpg', 1, '11'),
('https://product.hstatic.net/200000182297/product/ad108721582213060401p1499dt_q091021782223030258p599dt_2__ca873630512d4cc9b61f7bd3bf08c68b_master.jpg', 0, '17'),
('https://product.hstatic.net/200000182297/product/31_8a3eaf0308104cd8bb630c5e1194a274_master.jpg', 1, '13'),
('https://product.hstatic.net/200000182297/product/j092621962213160474p999dt_99ce7905e2e94cd5a18c40d85a4df068_master.jpg', 0, '19'),
('https://product.hstatic.net/200000182297/product/sm193121212322060401p799dt_z193221542322060401p899dt_83cda94747aa45b296030e2df6b89fd6_master.jpg', 0, '7'),
('https://product.hstatic.net/200000182297/product/ak401221312352160457p399dt_z401121542382160457p399dt_2__f3ed1e839d8a4ff9a15a5a5a87ee28de_master.jpg', 0, '24'),
('https://product.hstatic.net/200000182297/product/d191621412352110401p1399dt_3__73a088eab40a433ca72bbeba60e73e13_master.jpg', 0, '18'),
('https://product.hstatic.net/200000182297/product/sm193121212322060401p799dt_z193221542322060401p899dt_3__5abf5695d9ee4ae798a979a52ccc3dab_master.jpg', 0, '7'),
('https://product.hstatic.net/200000182297/product/3_6ac13cb8fbd74d3195b0e57f0f099652_master.jpg', 1, '18'),
('https://product.hstatic.net/200000182297/product/4_35a7431a025e44a48660e50db7f054c8_master.jpg', 1, '20'),
('https://product.hstatic.net/200000182297/product/ad108721582213060401p1499dt_q091021782223030258p599dt_6b83bd3e1c2d4841895f3008636d2df0_master.jpg', 0, '17'),
('https://product.hstatic.net/200000182297/product/210_fe6b471654ef42dbbc3c5882dc930508_master.jpg', 1, '19'),
('https://product.hstatic.net/200000182297/product/5_a93c4dcf98c94defaee40045d93ecbf7_master.jpg', 1, '15'),
('https://product.hstatic.net/200000182297/product/sm194121232332030457p799dt_z206021522382110447p699dt_4__9870cfe31b864bffb3b7e402e34eadee_master.jpg', 0, '10'),
('https://product.hstatic.net/200000182297/product/d203621412312160405p1399dt_2__cb5f0198fcfa472a8afd6a38477d1153_master.jpg', 0, '8'),
('https://product.hstatic.net/200000182297/product/sm195621222352169018p999dt_q670521732230900432p699dt_5__296e834c4ed1452cab4197c374564375_master.jpg', 0, '6'),
('https://product.hstatic.net/200000182297/product/22_7779da7751654ff5844e409c83238c31_master.jpg', 1, '22'),
('https://product.hstatic.net/200000182297/product/5_3d5eef22ad804b81848fb4bfc3c2f0c4_master.jpg', 1, '12'),
('https://product.hstatic.net/200000182297/product/4_e9d22bff0d834a98a9186681261199bd_master.jpg', 1, '6'),
('https://product.hstatic.net/200000182297/product/j048821962212400458p1399dt_44beb51a530d499da8dd49b21fd961f5_master.jpg', 0, '12'),
('https://product.hstatic.net/200000182297/product/d195021412362040418p1599dt_2__463f3ca8b58f40edab8174486cba6a2f_master.jpg', 0, '15'),
('https://product.hstatic.net/200000182297/product/2_dc797f567b934a4a870a258b98376c2c_master.jpg', 1, '8'),
('https://product.hstatic.net/200000182297/product/3_a75a636b559f4f199a8bcd4df7bb3fb3_master.jpg', 1, '2'),
('https://product.hstatic.net/200000182297/product/d195021412362040418p1599dt_4d483fc14fcb4549ac9f9020503c1845_master.jpg', 0, '15'),
('https://product.hstatic.net/200000182297/product/j013021962212020474p799dt_1__05b03f7eb596400797a3b5bd1f0aa1f4_master.jpg', 1, '14'),
('https://product.hstatic.net/200000182297/product/j012921962212400426p999dt_3829bb87560948d4aa3358f4775da8eb_master.jpg', 0, '21'),
('https://product.hstatic.net/200000182297/product/d020021412362420674p1399dt_3__c7ab01612ca24944b98d814a95afb038_master.jpg', 0, '2'),
('https://product.hstatic.net/200000182297/product/j048821962212400458p1399dt_3__dbc049950ab94463acf342224742ba3f_master.jpg', 0, '12'),
('https://product.hstatic.net/200000182297/product/hw036521742312000401p599dt_b86326ab5ac84e31a9a8ade1fb9012d1_master.jpg', 0, '11'),
('https://product.hstatic.net/200000182297/product/d432621412382000274p599dt_3__25485f4d7e1a4f9a820415036df6c356_master.jpg', 0, '1'),
('https://product.hstatic.net/200000182297/product/1_5869f370b1c74829bf3ce79c6f2d16f2_master.jpg', 1, '24'),
('https://product.hstatic.net/200000182297/product/ad128521582224720458p1499dt_q128621782224040418p699dt_3__5df055654a464fff8c5d44e7f7f8bee2_master.jpg', 0, '22'),
('https://product.hstatic.net/200000182297/product/sm194121232332030457p799dt_z206021522382110447p699dt_9a73aa1f7a5841648d82bfb2bc430e23_master.jpg', 0, '10'),
('https://product.hstatic.net/200000182297/product/1_e022c37119634825bad5e32998dc311e_master.jpg', 1, '10'),
('https://product.hstatic.net/200000182297/product/sm002921212332010457p799dt_q003021702332010457p699dt_fe7c39ad24dc48ac881dc1e3e290487e_master.jpg', 0, '20'),
('https://product.hstatic.net/200000182297/product/sm182121222332420401p799dt_z083021522213130674p699dt_a458c5e8d334472fb44d749698e26e25_master.jpg', 0, '3'),
('https://product.hstatic.net/200000182297/product/sm425521232231000257p429dt_q432421722322110474p429dt_3__8809ebc4bcc74fbfb52c48692fe9b44b_master.jpg', 0, '4'),
('https://product.hstatic.net/200000182297/product/4_f46eeefd07444e638aa9092027c4859b_master.jpg', 1, '3'),
('https://product.hstatic.net/200000182297/product/ts600421902232039023p359dt_q670121712230900491p599_1__46dceae6529c4006bacfee7c3939a182_master.jpg', 0, '23'),
('https://product.hstatic.net/200000182297/product/ts600421902232039023p359dt_q670121712230900491p599_20dbab1f1aa34ed08bcd76584ecb4737_master.jpg', 0, '23'),
('https://product.hstatic.net/200000182297/product/hw036521742312000401p599dt_2__16c0e2c2aab14041aac3b5fe2e7321f4_master.jpg', 0, '11'),
('https://product.hstatic.net/200000182297/product/ad091821582213030401p1899dt_q091921782223030401p599dt_2__e7127393a0b94227ada4b5a901edf148_master.jpg', 0, '5'),
('https://product.hstatic.net/200000182297/product/ad099421582223030658p1759dt_q108821782223050401p599dt_2__08e0509597064b5795362841857d9c4f_master.jpg', 0, '13'),
('https://product.hstatic.net/200000182297/product/72_ae5ace4a691f458d88f83e5b5074889e_master.jpg', 1, '5'),
('https://product.hstatic.net/200000182297/product/sm002921212332010457p799dt_q003021702332010457p699dt_1__3a9c1dd9c5c5433ead4d435893c277a8_master.jpg', 0, '20'),
('https://product.hstatic.net/200000182297/product/sm195621222352169018p999dt_q670521732230900432p699dt_4__d0ec3e6755ee47e998e0f733a0f261da_master.jpg', 0, '6');