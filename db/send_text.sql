insert into text (text, user_id, message_id)
values ($1, $2, $3);

select * from text
where message_id = $3