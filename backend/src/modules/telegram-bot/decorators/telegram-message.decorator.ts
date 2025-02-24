import { Context } from 'telegraf';

export function TelegramMessage() {
  return function (
    _: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const logger = (this as any)._logger;
      const ctx = args.find((arg) => arg instanceof Context) as Context;

      try {
        logger.log(`Received message: ${JSON.stringify(ctx.message)}`);

        await originalMethod.apply(this, args);

        logger.log(
          `Message ${ctx?.message?.message_id} processed successfully`,
        );
      } catch (error: any) {
        logger.error(`Error in ${propertyKey}: ${error}`);

        if (ctx) {
          await ctx.reply(error.message);
        }
      }
    };

    return descriptor;
  };
}
