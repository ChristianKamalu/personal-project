update textbook_listing
set
title = $2,
isbn = $3,
department = $4,
condition = $5,
description = $6,
price = $7,
image = $8
where listing_id = $1;

select * from textbook_listing
where user_id = $9;