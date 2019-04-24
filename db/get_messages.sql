select message_id, m.user_id as buyer_id, t.user_id as seller_id, m.listing_id, tb.title, tb.image, tb.condition, tb.price, tb.isbn
from message m
join textbook_listing t on t.listing_id = m.listing_id
join textbook tb on tb.textbook_id = t.textbook_id