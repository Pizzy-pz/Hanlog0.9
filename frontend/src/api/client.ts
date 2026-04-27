const BASE_URL = import.meta.env.VITE_API_BASE_URL

  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw error
    }

    return res.json()
  }

  export default request