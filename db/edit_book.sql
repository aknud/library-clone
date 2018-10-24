update books
set image_url = $2,
    title = $3,
    author = $4,
    genre = $5,
    description = $6
where book_id = $1;
select * from books;