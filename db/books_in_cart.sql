select * from books b
join libraryCart l
on b.book_id = l.book_id and l.user_id = $1;