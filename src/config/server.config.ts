import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export const serverSchema = z.object({
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3000),
});

export default registerAs('server', () => ({
  host: process.env.HOST,
  port: process.env.PORT,
}));
