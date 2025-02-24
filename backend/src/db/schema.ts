import {
  pgTable,
  varchar,
  timestamp,
  uniqueIndex,
  bigint,
  serial,
  integer,
  text,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp().defaultNow().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const user = pgTable(
  'user',
  {
    id: serial().primaryKey(),
    firstName: varchar(),
    lastName: varchar(),
    email: varchar().notNull(),
    password: varchar().notNull(),
    telegramId: bigint({ mode: 'number' }),
    ...timestamps,
  },
  (table) => [uniqueIndex('email_idx').on(table.email)],
);

export const word = pgTable('word', {
  id: serial().primaryKey(),
  word: varchar().notNull(),
  definition: text(),
  userId: integer()
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});
