import { View, Text, Image, TouchableNativeFeedback, StyleSheet, ScrollView, PermissionsAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoPro({ navigation }) {
  const [location, setLocation] = useState(false);

  // Request for location permission when the component mounts
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Location access
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Please select the precise location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
          requestMultiple: false,
          initialPermissions: [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION],
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        getLocation();
      } else {
        console.log('You cannot use Geolocation');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLocation(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        setLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  };

  // Listen for changes in the location state variable
  useEffect(() => {
    async function saveLocation() {
      if (location) {
        // console.log(location.coords.latitude,location.coords.longitude);
        await AsyncStorage.setItem('Latitude', JSON.stringify(location.coords.latitude));
        await AsyncStorage.setItem('Longitude', JSON.stringify(location.coords.longitude))
      }
    }
    saveLocation();
  }, [location]);



  return (
    <ScrollView style={{ backgroundColor: '#000', flex: 1 }}>
      <StatusBar backgroundColor='#e3b912' />
      <TouchableNativeFeedback onPress={() => navigation.navigate('checklist1')}>
      <View>
        <Image style={{ justifyContent: 'center', alignSelf: 'center', width: 200, height: 200, marginTop: '25%' }} source={require('../../images/pvr.png')} />
      </View>
      </TouchableNativeFeedback>
      
      {/* <View style={{ marginTop: '35%' }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('checklist1')}>
          <Image style={{ justifyContent: 'center', alignSelf: 'center', width: '100%', height: 300 }} source={require('../../images/Graph.png')} />
        </TouchableNativeFeedback>
      </View> */}
    </ScrollView>
  )
}