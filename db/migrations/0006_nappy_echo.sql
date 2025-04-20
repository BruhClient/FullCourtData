CREATE TYPE "public"."comment_vote" AS ENUM('UP', 'DOWN');--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"gameId" text NOT NULL,
	"author_id" text NOT NULL
);
