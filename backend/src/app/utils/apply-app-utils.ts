import { NestFastifyApplication } from '@nestjs/platform-fastify';

export type appUtilType = (app: NestFastifyApplication) => void | Promise<void>;

export const applyAppUtils = async (
  app: NestFastifyApplication,
  utils: appUtilType[],
): Promise<void> => {
  for (const appUtil of utils) {
    await appUtil(app);
  }
};
