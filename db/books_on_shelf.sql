select *
from books
where book_id = any (select book_id
                      from bookshelf
                      where user_id = $1);