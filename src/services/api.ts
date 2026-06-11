const API_BASE_URL = import.meta.env.VITE_HEALTHVAULT_API_URL ?? 'http://localhost:8080'

type ApiResponse<T> = {
  data: T
}

type ErrorResponse = {
  errorMessage?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | ErrorResponse | null

  if (!response.ok) {
    const message =
      body && 'errorMessage' in body && body.errorMessage
        ? body.errorMessage
        : `API request failed with status ${response.status}.`

    throw new ApiError(message, response.status)
  }

  if (!body || !('data' in body)) {
    throw new ApiError('API response did not include a data wrapper.', response.status)
  }

  return body.data
}
