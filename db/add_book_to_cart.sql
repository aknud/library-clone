insert into libraryCart (user_id, book_id) values ($1, $2);
select * from books b
join libraryCart l
on b.book_id = l.book_id and l.user_id = $1;

