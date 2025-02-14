import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export const authTokenSchema = z.object({
  JWT_SECRET: z.string(),
});

export default registerAs('auth-token', () => ({
  signOptions: {
    expiresIn: '1d',
  },
  secret: process.env.JWT_SECRET,
}));
