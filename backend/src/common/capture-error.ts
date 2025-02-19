import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpRequestUtil } from '../utils/http-request.util';
import { ENV_VARS } from '../config/env-vars.config';

export const ErrorDestinationEnum = {
  SLACK: 'SLACK',
  TELEGRAM: 'TELEGRAM',
  CONSOLE: 'CONSOLE',
} as const;

type ErrorDestination =
  (typeof ErrorDestinationEnum)[keyof typeof ErrorDestinationEnum];

/**
 * Service for capturing and routing error messages to different destinations
 * Supports sending errors to Slack, Telegram, or Console based on configuration
 */
@Injectable()
export class CaptureError {
  private readonly _destination: ErrorDestination;
  private readonly _logger = new Logger(CaptureError.name);
  private readonly _destinationMap = {
    [ErrorDestinationEnum.TELEGRAM]: (text: string) =>
      this._sendToTelegram(text),
    [ErrorDestinationEnum.CONSOLE]: (text: string) => this._logToConsole(text),
  };

  constructor(private readonly _configService: ConfigService) {
    this._destination =
      _configService.get<ENV_VARS['ERROR_DESTINATION']>('ERROR_DESTINATION');
  }

  /**
   * Captures an error and sends it to the configured destination
   * @param error - The error to capture and report
   */
  async captureError(error: Error): Promise<void> {
    const text = `Error in ${process.env.ENV} environment: \n${error.stack}\n`;

    await this._destinationMap[this._destination](text);
  }

  /**
   * Sends error message to Telegram using bot API
   * @param text - The error message to send
   */
  private async _sendToTelegram(text: string): Promise<void> {
    try {
      await HttpRequestUtil.makeGetRequest(
        encodeURI(
          `https://api.telegram.org/bot${this._configService.get<
            ENV_VARS['TELEGRAM_BOT_ERROR_TOKEN']
          >(
            'TELEGRAM_BOT_ERROR_TOKEN',
          )}/sendMessage?chat_id=${this._configService.get<
            ENV_VARS['TELEGRAM_ERROR_NOTIFICATION_CHAT_ID']
          >('TELEGRAM_ERROR_NOTIFICATION_CHAT_ID')}&text=${text}`,
        ),
      );
    } catch (e) {
      this._logger.error(`Failed to send error to Telegram: ${e.message}`);
    }
  }

  /**
   * Logs error message to console using Logger
   * @param text - The error message to log
   */
  private _logToConsole(text: string): void {
    this._logger.error(text);
  }
}
