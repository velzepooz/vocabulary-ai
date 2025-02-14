import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpRequestUtil } from '../utils/http-request.util';
import { ENV_VARS } from '../config/env-vars.config';

export const errorDestinationEnum = {
  SLACK: 'SLACK',
  TELEGRAM: 'TELEGRAM',
  CONSOLE: 'CONSOLE',
} as const;

type ErrorDestination =
  (typeof errorDestinationEnum)[keyof typeof errorDestinationEnum];

/**
 * Service for capturing and routing error messages to different destinations
 * Supports sending errors to Slack, Telegram, or Console based on configuration
 */
@Injectable()
export class CaptureError {
  private readonly _destination: ErrorDestination;
  private readonly _logger = new Logger(CaptureError.name);
  private readonly _destinationMap = {
    [errorDestinationEnum.SLACK]: (text: string) => this._sendToSlack(text),
    [errorDestinationEnum.TELEGRAM]: (text: string) =>
      this._sendToTelegram(text),
    [errorDestinationEnum.CONSOLE]: (text: string) => this._logToConsole(text),
  };

  constructor(private readonly _configService: ConfigService) {
    this._destination =
      _configService.get<ENV_VARS['ERROR_DESTINATION']>('ERROR_DESTINATION');
  }

  /**
   * Captures an error and sends it to the configured destination
   * @param error - The error to capture and report
   */
  async captureException(error: Error): Promise<void> {
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
            ENV_VARS['TELEGRAM_BOT_TOKEN']
          >(
            'TELEGRAM_BOT_TOKEN',
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
   * Sends error message to Slack using Web API
   * @param text - The error message to send
   */
  private async _sendToSlack(text: string): Promise<void> {
    try {
      const response = await HttpRequestUtil.makePostRequest<{ ok: boolean }>(
        'https://slack.com/api/chat.postMessage',
        {
          channel: this._configService.get<
            ENV_VARS['SLACK_ERROR_NOTIFICATION_CHANNEL']
          >('SLACK_ERROR_NOTIFICATION_CHANNEL'),
          text,
        },
        {
          Authorization: `Bearer ${this._configService.get<
            ENV_VARS['SLACK_ERROR_BOT_TOKEN']
          >('SLACK_ERROR_BOT_TOKEN')}`,
        },
      );
      if (!response.ok) {
        throw new Error(
          `Slack API responded with status: ${JSON.stringify(response)}`,
        );
      }
    } catch (e) {
      this._logger.error(`Failed to send error to Slack: ${e.message}`);
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
