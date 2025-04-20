CREATE TABLE "commentVote" (
	"id" serial PRIMARY KEY NOT NULL,
	"vote" "comment_vote" DEFAULT 'UP' NOT NULL,
	"gameId" text NOT NULL,
	"author_id" integer,
	"commentId" serial NOT NULL
);
