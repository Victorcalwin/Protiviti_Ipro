import { View, Text, Image, ScrollView, TextInput, ImageBackground, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Svg, { Defs, Path, G, Circle, ClipPath, LinearGradient, RadialGradient, Stop, } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../../ENV';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const handleNavigation = async (screenName) => {

    try {
      const res = await axios.post(`${ENV.API_END_POINT}UsersLogin/login`, {
        email: email,
      })
     
        console.log(res,"adkdkdidk")
      
      await AsyncStorage.setItem('token', JSON.stringify(res.data.token))
      await AsyncStorage.setItem('user', JSON.stringify(res.data.id))
      await AsyncStorage.setItem('username', JSON.stringify(res.data.user))
      navigation.navigate(screenName, { email: email })

    } catch (error) {
        if(email.length == 0){
          Alert.alert("Please Enter your Email")
        }else{
          Alert.alert(error.response.data.message)
        }
    }

  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} >
      <View style={{ marginHorizontal: '7%', marginTop: 40, }}>
        <View>
          <Image style={{ width: 100, height: 100 }} source={require('../../images/pvr.png')} />
        </View>
        <View style={{ marginTop: 40, marginBottom: 20, }}>
          <Text style={{ fontFamily: 'BarlowCondensed-BoldItalic', fontWeight: 'bold', fontSize: 24, color: '#fff', }}>Login</Text>
          {/* <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#fff' }}>Enter your registered email id.</Text> */}
          {/* <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#fff' }}>to login and start auditing.</Text> */}
        </View>
        <View style={{}}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 16, fontWeight: '700', marginBottom: 10,color:'#fff'}}>Enter your registered email id</Text>
          <TextInput type='email' placeholder='Enter your Email' onChangeText={(txt) => setEmail(txt)} style={{ borderWidth: 1, borderRadius: 7, borderColor: '#fff',backgroundColor:'#fff', paddingHorizontal: 20, fontSize: 17, }} />
        </View>
        <View style={{ width: '100%', marginTop: 40, }}>
          {/* <Image style={{ width: '100%', height: 300 }} source={require('../../images/Graph.png')} /> */}

          <View style={{ bottom: 20, alignSelf: 'center', width: '100%', backgroundColor: '#e3b912', borderRadius: 10,marginTop:'90%' }}>
            <Text style={{ fontFamily: 'BarlowCondensed-Medium', textAlign: 'center', paddingVertical: 10, fontSize: 18, color: '#FFFFFF', }} onPress={() => handleNavigation('otp')}>PROCEED</Text>
          </View>
        </View>
      </View>
    </ScrollView>


  )
}
