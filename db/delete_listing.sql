delete from textbook_listing
where listing_id = $1;

select * from textbook_listing;