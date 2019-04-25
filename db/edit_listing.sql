update textbook
set
title = $2,
isbn = $3,
condition = $4,
price = $5,
image = $6
where textbook_id = $1;

select * from textbook_listing;