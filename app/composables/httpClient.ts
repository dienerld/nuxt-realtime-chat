interface PerformRequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  accessToken?: string | null
  body?: object
}

async function performRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options: PerformRequestOptions,
) {
  const { accessToken, body, ...restOptions } = options
  const response = await $fetch<T>(url, {
    ...restOptions,
    method,
    ...(body && { body }),
    headers: {
      ...restOptions.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })

  return response
}

function performUseFetch<T>(url: string, options: PerformRequestOptions) {
  const { accessToken, ...restOptions } = options
  return useFetch<T>(url, {
    ...restOptions,
    headers: {
      ...restOptions.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })
}

export function useHttpClient() {
  const { accessToken } = useAuth()
  const { apiUrl } = useRuntimeConfig().public

  function withBaseUrl(url: string) {
    // sanitize url
    const sanitizedUrl = url.startsWith('/') ? url.slice(1) : url
    const sanitizedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl

    return `${sanitizedApiUrl}/${sanitizedUrl}`
  }

  return {
    get: <T>(url: string) => performRequest<T>('GET', withBaseUrl(url), { accessToken }),
    post: <T>(url: string, body: object) => performRequest<T>('POST', withBaseUrl(url), { accessToken, body }),
    put: <T>(url: string, body: object) => performRequest<T>('PUT', withBaseUrl(url), { accessToken, body }),
    delete: <T>(url: string) => performRequest<T>('DELETE', withBaseUrl(url), { accessToken }),
    useFetch: <T>(url: string, options?: PerformRequestOptions) => performUseFetch<T>(withBaseUrl(url), {
      ...options,
      headers: {
        ...options?.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }),
  }
}
