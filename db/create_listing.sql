insert into textbook_listing (user_id, title, isbn, department, condition, description, price, image)
values ($1, $2, $3, $4, $5, $6, $7, $8);

select * from textbook_listing
where user_id = $1;