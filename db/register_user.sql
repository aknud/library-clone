insert into libUser ( username, password)
values ($1, $2)
returning user_id, username;



-- create table libUser (
--  user_id serial primary key,
--  username varchar(50),
--  password varchar(100)
-- );