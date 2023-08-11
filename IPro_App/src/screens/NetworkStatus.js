import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';



const NetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true); // Initialize as online
  
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
  
      return () => {
        unsubscribe(); // Cleanup the event listener when the component unmounts
      };
    }, []);
  
    return (
      <View>
        <Text>Network Status: {isConnected ? 'Online' : 'Offline'}</Text>
      </View>
    );
  };
export default NetworkStatus;  