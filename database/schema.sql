set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favoriteList" (
	"favoriteId" serial NOT NULL,
	"userId" integer NOT NULL,
	"placeId" TEXT NOT NULL,
	CONSTRAINT "favoriteList_pk" PRIMARY KEY ("favoriteId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"commentId" serial NOT NULL,
	"favoriteId" integer NOT NULL,
	"userId" integer NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "favoriteList" ADD CONSTRAINT "favoriteList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("favoriteId") REFERENCES "favoriteList"("favoriteId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
