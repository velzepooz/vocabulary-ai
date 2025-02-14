/**
 * Custom error class for HTTP request related errors
 */
export class HttpRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpRequestError';
  }
}

/** HTTP method types supported by the utility */
type HttpMethod = 'GET' | 'POST';

/** Options for making HTTP requests */
interface FetchOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

/**
 * Utility class for making HTTP requests
 */
export class HttpRequestUtil {
  /**
   * Makes a GET request to the specified URL
   * @param url - The URL to make the request to
   * @param headers - Optional headers to include in the request
   * @returns Promise resolving to the response data
   */
  public static async makeGetRequest<Response>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest<Response>(url, {
      method: 'GET',
      headers,
    });
  }

  /**
   * Makes a POST request to the specified URL
   * @param url - The URL to make the request to
   * @param body - The request body to send
   * @param headers - Optional headers to include in the request
   * @returns Promise resolving to the response data
   */
  public static async makePostRequest<Response>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest<Response>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Makes a GraphQL request to the specified URL
   * @param url - The GraphQL endpoint URL
   * @param query - The GraphQL query string
   * @param headers - Optional headers to include in the request
   * @returns Promise resolving to the response data
   * @throws {HttpRequestError} If the GraphQL response contains errors
   */
  public static async makeGraphqlRequest<Response>(
    url: string,
    query: string,
    headers?: Record<string, string>,
  ): Promise<Response> {
    const data = await this.makePostRequest<{
      data: Response;
      errors: unknown[];
    }>(url, { query }, headers);

    if (data.errors?.length) {
      throw new HttpRequestError(
        `GraphQL error: ${JSON.stringify(data.errors)}`,
      );
    }

    return data.data;
  }

  /**
   * Internal method to make HTTP requests
   * @param url - The URL to make the request to
   * @param options - Request options including method, headers, and body
   * @returns Promise resolving to the response data
   * @throws {HttpRequestError} If the request fails
   */
  private static async makeRequest<Response>(
    url: string,
    options: FetchOptions,
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);
      return this.handleResponse<Response>(response);
    } catch (error) {
      throw new HttpRequestError(error.message);
    }
  }

  /**
   * Handles the HTTP response
   * @param response - The Response object from fetch
   * @returns Promise resolving to the parsed response data
   * @throws {HttpRequestError} If the response status is not ok
   */
  private static async handleResponse<ResponseData>(
    response: Response,
  ): Promise<ResponseData> {
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new HttpRequestError(
        `Request failed with status ${response.status}: ${errorMessage}`,
      );
    }
    return response.json();
  }
}
