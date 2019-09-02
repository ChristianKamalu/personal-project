select u.email, listing_id, l.user_id, l.bought, l.isbn, title, l.condition, l.price, l.image, l.department, l.description
from Textbook_Listing l
join Users u on u.user_id=l.user_id
where l.bought = false;