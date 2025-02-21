import { user } from '../../../db/schema';

export type User = typeof user.$inferSelect;
export type createUserType = typeof user.$inferInsert;
