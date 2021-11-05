CREATE TABLE users (id SERIAL PRIMARY KEY, nombre VARCHAR(50), email VARCHAR(50), "password" VARCHAR(50));

CREATE TABLE posts (id SERIAL PRIMARY KEY, titulo VARCHAR(50), cuerpo VARCHAR(50), 
user_id int, FOREIGN KEY (user_id) references users(id) );