insert into libraryCart (user_id, book_id) values ($1, $2);
select b.book_id, b.title, b.author, b.genre, b.description, b.image_url, b.in_stock, l.librarycart_id, l.user_id
from books b join libraryCart l
on b.book_id = l.book_id
where l.book_id = $2;






-- select * from books
-- where book_id = $2;