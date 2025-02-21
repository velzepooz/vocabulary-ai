CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar,
	"lastName" varchar,
	"email" varchar NOT NULL,
	"password" varchar,
	"telegramId" bigint,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "user" USING btree ("email");