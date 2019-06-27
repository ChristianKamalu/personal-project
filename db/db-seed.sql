

CREATE TABLE Users (
	user_id serial NOT NULL,
	firstName varchar(50) NOT NULL,
	lastName varchar(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	hash TEXT NOT NULL UNIQUE,
	CONSTRAINT Users_pk PRIMARY KEY (user_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Textbook_Listing (
	listing_id serial NOT NULL,
	user_id integer NOT NULL,
	title varchar(500) NOT NULL,
	isbn integer NOT NULL,
	department varchar(100) NOT NULL,
	condition varchar(20) NOT NULL,
	description varchar(1000) NOT NULL,
	price integer NOT NULL,
	image TEXT NOT NULL,
	bought BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT Textbook_Listing_pk PRIMARY KEY (listing_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Message (
	message_id serial NOT NULL,
	user_id integer NOT NULL,
	listing_id integer NOT NULL,
	CONSTRAINT Message_pk PRIMARY KEY (message_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Text (
	text varchar(500) NOT NULL,
	message_id integer NOT NULL,
	user_id integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE Textbook_Listing ADD CONSTRAINT Textbook_Listing_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE Message ADD CONSTRAINT Message_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Message ADD CONSTRAINT Message_fk1 FOREIGN KEY (listing_id) REFERENCES Textbook_Listing(listing_id);

ALTER TABLE Text ADD CONSTRAINT Text_fk0 FOREIGN KEY (message_id) REFERENCES Message(message_id);
ALTER TABLE Text ADD CONSTRAINT Text_fk1 FOREIGN KEY (user_id) REFERENCES Users(user_id);
