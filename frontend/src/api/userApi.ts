import type { User } from '../types';
import { API_BASE_URL, handleResponse } from '../utils/httpClient';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return handleResponse<User[]>(response);
};

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return handleResponse<User>(response);
};
