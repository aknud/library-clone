select bs.bs_id, bs.user_id, b.book_id, b.title, b.author, b. description, b.genre, b.image_url, b.in_stock
from books b
inner join bookshelf bs
on b.book_id = bs.book_id
where b.book_id = any(select book_id
                        from bookshelf
                        where user_id = $1);