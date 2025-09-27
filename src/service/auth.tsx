import apiClient from './apiClient';
import { BASE_URL } from './config';
import {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  getRefreshToken,
} from './storage';
import { resetAndNavigate } from '../utils/NavigationUtils';
import axios from 'axios';

export const loginWithGoogle = async (idToken: string) => {
  const { data } = await apiClient.post('/user/login', { id_token: idToken });
  setAccessToken(data?.accessToken);
  setRefreshToken(data?.refreshToken);
  return data?.user;
};

export const logout = async () => {
  removeAccessToken();
  removeRefreshToken();
  resetAndNavigate('LoginScreen');
};

export const refresh_tokens = async (): Promise<boolean> => {
  try {
    const refershToken = getRefreshToken();

    if (!refershToken) {
      throw new Error('No refresh token found');
    }

    const { data } = await axios.post(`${BASE_URL}/user/refresh`, {
      refershToken,
    });

    if (data?.accessToken) {
      setAccessToken(data?.accessToken);
      return true;
    } else {
      throw new Error('No access token found');
    }
  } catch (error) {
    console.log('Token refresh failed', error);
    logout();
    return false;
  }
};
