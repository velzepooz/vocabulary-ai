import { word } from '../../../db/schema';

export type Word = typeof word.$inferSelect;
export type createWord = typeof word.$inferInsert;
