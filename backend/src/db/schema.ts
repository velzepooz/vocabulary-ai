import {
  pgTable,
  integer,
  varchar,
  timestamp,
  uniqueIndex,
  bigint,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const user = pgTable(
  'user',
  {
    id: integer().primaryKey(),
    userName: varchar(),
    email: varchar().notNull(),
    password: varchar(),
    telegramId: bigint({ mode: 'number' }),
    ...timestamps,
  },
  (table) => [uniqueIndex('email_idx').on(table.email)],
);
