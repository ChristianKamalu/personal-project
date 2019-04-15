CREATE TABLE "User" (
	"user_id" serial NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL UNIQUE,
	"hash" TEXT NOT NULL UNIQUE,
	CONSTRAINT User_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Textbook_Listing" (
	"listing_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"textbook_id" integer NOT NULL,
	"bought" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT Textbook_Listing_pk PRIMARY KEY ("listing_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Textbook" (
	"textbook_id" serial NOT NULL UNIQUE,
	"ISBN" integer NOT NULL,
	"title" varchar(200) NOT NULL,
	"condition" varchar(500) NOT NULL,
	"price" integer NOT NULL,
	"image" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Conversation" (
	"conversation_id" serial NOT NULL,
	"message_id" integer NOT NULL,
	CONSTRAINT Conversation_pk PRIMARY KEY ("conversation_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Message" (
	"message_id" serial NOT NULL UNIQUE,
	"text" varchar(500) NOT NULL,
	CONSTRAINT Message_pk PRIMARY KEY ("message_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User_Conversation" (
	"conversation_id" integer NOT NULL,
	"user_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Textbook_Listing" ADD CONSTRAINT "Textbook_Listing_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "Textbook_Listing" ADD CONSTRAINT "Textbook_Listing_fk1" FOREIGN KEY ("textbook_id") REFERENCES "Textbook"("textbook_id");


ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_fk0" FOREIGN KEY ("message_id") REFERENCES "Message"("message_id");


ALTER TABLE "User_Conversation" ADD CONSTRAINT "User_Conversation_fk0" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("conversation_id");
ALTER TABLE "User_Conversation" ADD CONSTRAINT "User_Conversation_fk1" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
