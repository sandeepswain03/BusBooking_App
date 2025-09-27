import { View, Text, SafeAreaView } from 'react-native';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { logout } from '../service/auth';
import Bookings from '../components/home/Bookings';
import React from 'react';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />

      <View className="flex-row justify-between items-center px-4 py-2">
        <Text className="font-okra font-bold text-3xl">Bus Tickets</Text>

        <UserCircleIcon size={38} color="red" onPress={logout} />
      </View>

      <Bookings />
    </View>
  );
};

export default HomeScreen;
