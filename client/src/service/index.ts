import { AxiosError } from 'axios';
import { AXIOS_INSTANCE } from '../api/axiosConfig';
import { getToken, removeToken } from '../utils/tokenStorage';


export const registerUser = async (userData: any) => {
  try {
    const { data } = await AXIOS_INSTANCE.post(`/auth/register`, userData);
    return data.token;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message
    }
    throw error;
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const { data } = await AXIOS_INSTANCE.post(`/auth/login`, credentials);
    return data.token;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await AXIOS_INSTANCE.get(`/auth/me`)
    return response.data;
  } catch (error) {
    await removeToken('userToken');
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const {data} = await AXIOS_INSTANCE.get('/tasks')
  } catch (error) {
    throw error
  }
}