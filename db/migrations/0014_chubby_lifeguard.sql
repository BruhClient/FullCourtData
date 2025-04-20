ALTER TABLE "commentVote" DROP CONSTRAINT "commentVote_author_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "commentVote" DROP CONSTRAINT "commentVote_commentId_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "commentVote" ADD CONSTRAINT "commentVote_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentVote" ADD CONSTRAINT "commentVote_commentId_comments_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;