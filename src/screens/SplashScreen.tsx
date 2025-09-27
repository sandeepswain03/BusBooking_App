import { View, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { getAccessToken, getRefreshToken } from '../service/storage';
import { jwtDecode } from 'jwt-decode';
import { refresh_tokens } from '../service/auth';

interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const tokenCheck = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken || '');
      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('LoginScreen');
        Alert.alert('Session Expired', 'Please login again');
        return;
      }

      if (decodedAccessToken?.exp < currentTime) {
        const refreshed = await refresh_tokens();
        if (!refreshed) {
          Alert.alert('There was an error');
        }
      }

      resetAndNavigate('HomeScreen');
      return;
    }
    resetAndNavigate('LoginScreen');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-secondary">
      <Image
        source={require('../assets/images/logo_t.png')}
        className="h-[30%] w-[30%]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
