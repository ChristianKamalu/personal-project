select message_id, m.user_id as buyer_id, t.user_id as seller_id, m.listing_id, t.title, t.image, t.condition, t.price, t.isbn, t.department, t.description
from message m
join textbook_listing t on t.listing_id = m.listing_id;