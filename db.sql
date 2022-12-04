-- Database: db

-- DROP DATABASE IF EXISTS "db";

-- CREATE DATABASE db
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;


DROP TABLE IF EXISTS "casts";
CREATE TABLE "casts" (
  	"id" varchar(10) not null,
	"image" varchar(250),
	"legacyNameText" varchar(50),
	"name" varchar(50),
	"birthDate" varchar(10) ,
	"birthPlace" varchar(200),
	"gender" varchar(6),
	"heightCentimeters" numeric(6,2),
	"nicknames" text[],
	"realName" varchar(50)
)
;

DROP TABLE IF EXISTS "users";
CREATE TABLE "users"(
	"id" int not null,
	"username" varchar(50) not null,
	"password" varchar(255) not null,
	"like" varchar(10)[]
);

DROP TABLE IF EXISTS movies;
CREATE TABLE "movies"(
	"id" varchar(10) not null,
	"img" varchar(250),
	"title" varchar(250) ,
	"year" int4,
	"topRank" int4,
	"rating" numeric(2,1),
	"ratingCount" int4,
	"genres" varchar(50) array
)
;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
	"idMovie" varchar(10) not null,
	"author" varchar(250) not null,
	"authorRating" int4,
	"helpfulnessScore" numeric(25,23),
	"interestingVotes" integer[],
	"languageCode" varchar(10),
	"reviewText" text,
	"reviewTitle" text,
	"submissionDate" varchar(10)
);

DROP TABLE IF EXISTS synopses;
CREATE TABLE synopses (
	"idMovie" varchar(10) not null,
	"hasProfanity" bool,
	"language" varchar(10),
	"text" text
);

DROP TABLE IF EXISTS "characters";
CREATE TABLE "characters" (
	"idMovie" varchar(10) not null,
	"idCast" varchar(10) not null,
	"characters" text[]
);

ALTER TABLE "casts" ADD CONSTRAINT "pk_casts" PRIMARY KEY ("id") ;
ALTER TABLE "users" ADD CONSTRAINT "pk_users" PRIMARY KEY ("id") ;
ALTER TABLE "movies" ADD CONSTRAINT "pk_movies" PRIMARY KEY ("id");
ALTER TABLE "reviews" ADD CONSTRAINT "pk_reviews" PRIMARY KEY ("idMovie","author");
ALTER TABLE "synopses" ADD CONSTRAINT "pk_synopses" PRIMARY KEY ("idMovie");
ALTER TABLE "characters" ADD CONSTRAINT "pk_characters" PRIMARY KEY ("idMovie","idCast");
	


ALTER TABLE "synopses" ADD CONSTRAINT "PK_synopses_Movies" FOREIGN KEY ("idMovie") REFERENCES "movies" ("id");
ALTER TABLE "characters" ADD CONSTRAINT "PK_characters_cast" FOREIGN KEY ("idCast") REFERENCES "casts" ("id");
ALTER TABLE "reviews" ADD CONSTRAINT "PK_reviews_movies" FOREIGN KEY ("idMovie") REFERENCES "movies" ("id");
ALTER TABLE "characters" ADD CONSTRAINT "PK_characters_movies" FOREIGN KEY ("idMovie") REFERENCES "movies" ("id");
