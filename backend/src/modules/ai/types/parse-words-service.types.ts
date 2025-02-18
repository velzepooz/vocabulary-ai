import { z } from 'zod';
import { wordPairSchema } from '../schemas/parsed-words.schema';

export type ParsedWordPair = z.infer<typeof wordPairSchema>;
