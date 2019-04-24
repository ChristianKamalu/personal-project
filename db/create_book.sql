insert into textbook (title, isbn, condition, price, image)
values ($1, $2, $3, $4, $5);

select textbook_id from textbook
where title = $1 and isbn = $2 and condition = $3 and price = $4 and image = $5;