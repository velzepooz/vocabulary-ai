import { z } from 'zod';

export const wordPairSchema = z.object({
  word: z.string(),
  translation: z.string(),
  context: z.string().optional(),
});
