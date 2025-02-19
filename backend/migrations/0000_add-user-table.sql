CREATE TABLE "user" (
	"id" integer PRIMARY KEY NOT NULL,
	"userName" varchar,
	"email" varchar NOT NULL,
	"password" varchar,
	"telegramId" bigint,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "user" USING btree ("email");