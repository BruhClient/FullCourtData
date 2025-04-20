import { relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  serial
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"





export const userRoleEnum = pgEnum("user_role", ["admin", "user", "editor"]);

export const commentVoteEnum = pgEnum("comment_vote", ["UP","DOWN"]);


export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),

  role: userRoleEnum("role").default("user").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  username : text("username"), 
  hashedPassword : text("hashedPassword"), 
  isOauth : boolean("isOauth"),
  image: text("image"),
  
})
 
export const usersRelations = relations(users, ({ many }) => ({
	comments: many(comments),
  commentVote : many(commentVotes)
})) 


export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),

    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()).notNull(),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    email : text('email').unique().notNull(), 
    emailReplaced : text("emailReplaced"), 


    token: text("token").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
  },
  
)

export const passwordTokens = pgTable(
    "passwordToken",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      code : text('code').notNull(), 
      expiresAt: timestamp("expires_at", { mode: "date" }).notNull(), // expiration date
      email : text('email').unique().notNull(), 
     
    },
    
  )

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  gameId : text("gameId").notNull(),
  authorId: text('author_id').notNull().references(() => users.id,{ onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  
 
});

export const commentsRelations = relations(comments, ({ one,many }) => ({
    author: one(users, {
      fields: [comments.authorId],
      references: [users.id],
    }),
    votes : many(commentVotes)
}));

export const commentVotes = pgTable('commentVote', {
  id: serial('id').primaryKey(),
  vote: commentVoteEnum('vote').default("UP").notNull(),
  authorId: text('author_id').notNull().references(() => users.id,{ onDelete: "cascade" }),
  commentId : integer("commentId").notNull().references(() => comments.id,{ onDelete: "cascade" })
 
});

export const commentVoteRelations = relations(commentVotes, ({ one }) => ({
  author: one(users, {
    fields: [commentVotes.authorId],
    references: [users.id],
  }),
  comment : one(comments, { 
    fields : [commentVotes.commentId], 
    references : [comments.id]
  })
}));




  



 
