select "listing_id", "user_id", "bought", "ISBN", "title", "condition", "price", "image"
from "Textbook_Listing"
join "Textbook" on "Textbook_Listing"."textbook_id"="Textbook"."textbook_id"