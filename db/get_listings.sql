select u.email, listing_id, t.textbook_id, l.user_id, bought, ISBN, title, condition, price, image
from Textbook_Listing l
join Textbook t on l.textbook_id=t.textbook_id
join Users u on u.user_id=l.user_id