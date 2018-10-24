delete from libraryCart
where libraryCart_id = $2;
select * from books b
join libraryCart l
on b.book_id = l.book_id and l.user_id = $1;