
insert into bookshelf(user_id, book_id)
values($1, unnest(array [$2]));

update books
set in_stock = false
where book_id = any ( select book_id
                    from bookshelf
                    where user_id = $1);

delete from librarycart
where user_id = $1;

select *
from books
where book_id = any (select book_id
                      from bookshelf
                      where user_id = $1);