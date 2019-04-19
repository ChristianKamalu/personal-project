insert into Textbook (
    ISBN,
    title,
    condition,
    price,
    image
    ) values (
    9780812995701,
    E'Dreyer\'s English: An Utterly Correct Guide to Clarity and Style',
    'hated this book so I threw it around the place. Horrible condition.',
    27,
    'https://images-na.ssl-images-amazon.com/images/I/41pOez1GNgL._SL160_.jpg'
), (
    9780471121206,
    'Chemistry: Concepts and Problems: A Self-Teaching Guide',
    'decent shape. no missing pages, the corners show a little bit of use.',
    '124',
    'https://images-na.ssl-images-amazon.com/images/I/51HPfOJ4E2L._SL160_.jpg'
');
--delete apostrophe before running
insert into Textbook_Listing (
    user_id,
    textbook_id
    ) values (
    1,
    2
), (
    1,
    1
);