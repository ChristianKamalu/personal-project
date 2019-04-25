select listing_id, t.textbook_id, user_id, bought, ISBN, title, condition, price, image
from Textbook_Listing
join Textbook t on Textbook_Listing.textbook_id=t.textbook_id