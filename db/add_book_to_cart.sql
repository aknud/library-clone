insert into libraryCart (user_id, book_id) values ($1, $2);
select * from libraryCart 
where user_id = $1;