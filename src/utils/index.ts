class ApiCallError extends Error {
  statusCode: number;
  response: Response;
  body: unknown;

  constructor(res: Response, body: unknown) {
    super("Failed to fetch");
    this.statusCode = res.status;
    this.response = res;
    this.body = body;
  }
}

// Cheap and cheerful API call function
export async function apiCall<T = unknown>({
  url,
  config = {},
}: {
  url: string;
  config?: RequestInit;
}) {
  const result = await fetch(url, {
    ...config,
    headers: {
      Accept: "application/json",
      ...config.headers,
    },
  });

  let response;

  try {
    response = await result.json();
  } catch (error) {
    if (!result.ok) {
      throw new ApiCallError(result, null);
    }
  }

  if (!result.ok) {
    throw new ApiCallError(result, response);
  }

  return response as T;
}
