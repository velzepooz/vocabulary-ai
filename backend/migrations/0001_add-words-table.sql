CREATE TABLE "word" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" varchar NOT NULL,
	"definition" text,
	"userId" integer NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "word" ADD CONSTRAINT "word_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;