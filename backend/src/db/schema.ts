import {
  pgTable,
  integer,
  varchar,
  timestamp,
  uniqueIndex,
  bigint,
  serial,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const user = pgTable(
  'user',
  {
    id: serial().primaryKey(),
    firstName: varchar(),
    lastName: varchar(),
    email: varchar().notNull(),
    password: varchar(),
    telegramId: bigint({ mode: 'number' }),
    ...timestamps,
  },
  (table) => [uniqueIndex('email_idx').on(table.email)],
);
