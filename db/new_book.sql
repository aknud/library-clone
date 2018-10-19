insert into books (image_url,title,author,genre,description,in_stock) values ($1,$2,$3,$4,$5, true);
select * from books;