export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const API_BASE_URL = 'http://localhost:3001/bff';
