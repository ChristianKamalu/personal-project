select message_id, m.user_id as buyer_id, t.user_id as seller_id, m.listing_id
from message m
join textbook_listing t on t.listing_id = m.listing_id