/**
 * Custom error class for HTTP request related errors
 */
export class HttpRequestError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'HttpRequestError';
    this.status = status || 500;
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
    } catch (error: any) {
      throw new HttpRequestError(error.status, error.message);
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
      const error = await response.json();
  
      throw new HttpRequestError(
        response.status,
        error.message,
      );
    }
  
    return response.json();
  }
}
  