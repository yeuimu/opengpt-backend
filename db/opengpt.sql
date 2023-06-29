-- 连接到数据库
ATTACH DATABASE 'opengpt.db' AS user;

-- 创建数据表并定义字段
CREATE TABLE user.auth (
    email TEXT PRIMARY KEY,
    password TEXT
);

-- 创建邮箱字段的索引
CREATE INDEX idx_email ON auth(email);

-- 插入数据
INSERT INTO user.auth (email, password) VALUES ('user1@example.com', 'password1');
INSERT INTO user.auth (email, password) VALUES ('user2@example.com', 'password2');
INSERT INTO user.auth (email, password) VALUES ('user3@example.com', 'password3');
