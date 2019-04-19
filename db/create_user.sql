insert into Users (
    firstName,
    lastName,
    email,
    hash
) values (
    $1,
    $2,
    $3,
    $4
)
returning user_id, firstName, lastName, email;