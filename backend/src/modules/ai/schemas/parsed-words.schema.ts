import { z } from 'zod';

export const wordPairSchema = z.object({
  word: z.string(),
  definition: z.string(),
  context: z.string().optional(),
});
