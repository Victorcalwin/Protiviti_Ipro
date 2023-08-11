import { View, Text, Image, ScrollView, TextInput, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { Defs, Path, G, Circle, ClipPath, LinearGradient, RadialGradient, Stop, } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../../ENV';

export default function Otppage({ navigation, route }) {

  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState([])
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;


  useEffect(() => {
    let intervalId;
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [seconds]);




  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const loginNumber = route.params?.loginNumber;

  const onChangeTextInput1 = (text) => {
    if (text.length === 1) {
      input2Ref.current.focus();
      setOtp([...text])
    }
  }
  const onChangeTextInput2 = (text) => {
    if (text.length === 1) {
      input3Ref.current.focus();
      setOtp([...otp, text])
    }
    if (text.length === 0) {
      input1Ref.current.focus();
    }
  }
  const onChangeTextInput3 = (text) => {
    if (text.length === 1) {
      input4Ref.current.focus();
      setOtp([...otp, text])
    }
    if (text.length === 0) {
      input2Ref.current.focus();
    }
  }
  const onChangeTextInput4 = (text) => {
    setOtp([...otp, text])
    if (text.length === 0) {
      input3Ref.current.focus();
    }
  }

  let email = route.params?.email;

  const handleNavigation = async (screenName) => {
    try {
      const validation = await AsyncStorage.getItem('token')
      const validationUser = await AsyncStorage.getItem('user')
      console.log(validationUser, "validationUser");
      await axios.post(`${ENV.API_END_POINT}UsersLogin/otp`, { otp: otp, id: validationUser, token: validation, email: email })
      await AsyncStorage.setItem('email', email);
      navigation.navigate(screenName);
    } catch (error) {
      Alert.alert(error.response.data.message)
    }

  }

  const handleResent = async () => {
    try {
      const res = await axios.post(`${ENV.API_END_POINT}UsersLogin/login`, {
        email: email,
      })
      await AsyncStorage.setItem('token', JSON.stringify(res.data.token))
      setSeconds(60);
      setRetryCount(retryCount + 1);
      Alert.alert("OTP Send")
    } catch (error) {
      console.log(error);
    }
  }

  const handleResend = () => {
    if (retryCount >= MAX_RETRIES) {
      Alert.alert('You have reached the maximum number of retries');
    } else {
      handleResent(email, retryCount, setRetryCount, setSeconds);
    }
  };

  return (

    <ScrollView style={{ paddingHorizontal: '7%', flex: 1, backgroundColor: '#000' }} >
      <View style={{ marginTop: 40, }}>
        <View>
          <Image style={{ width: 100, height: 100 }} source={require('../../images/pvr.png')} />
        </View>
        <View style={{ marginTop: 40, marginBottom: 20, }}>
          <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontWeight: '700', fontSize: 19, color: '#fff', marginBottom: 10 }}>VERIFY YOUR EMAIL</Text>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#fff', }}>We have sent an OTP to your Email <Text style={{ color: '#00A2B8' }}> {loginNumber}</Text></Text>
          <Text> Enter the code to verify.</Text>
        </View>
        <View style={{ marginBottom: 20, }}>
          {/* <Text style={{ color: '#004068', textDecorationLine: 'underline', fontFamily: 'BarlowCondensed-Bold', fontSize: 16, }}>WRONG EMAIL ID.?</Text> */}
        </View>
        <View style={{ paddingBottom: 10, marginBottom: 20, }}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, fontWeight: '600', marginBottom: 10,color:'#fff' }}>Please enter OTP</Text>
          <View style={{ flexDirection: 'row', fontSize: 17, justifyContent: 'space-between' }}>
            <TextInput keyboardType='numeric' ref={input1Ref} maxLength={1} onChangeText={onChangeTextInput1} style={{ fontSize: 19, borderWidth: 1, borderRadius: 7, borderColor: '#fff', textAlign: 'center', height: 45, width: 45,backgroundColor:'#fff' }} />
            <TextInput keyboardType='numeric' ref={input2Ref} maxLength={1} onChangeText={onChangeTextInput2} style={{ fontSize: 19, borderWidth: 1, borderRadius: 7, borderColor: '#fff', textAlign: 'center', height: 45, width: 45,backgroundColor:'#fff' }} />
            <TextInput keyboardType='numeric' ref={input3Ref} maxLength={1} onChangeText={onChangeTextInput3} style={{ fontSize: 19, borderWidth: 1, borderRadius: 7, borderColor: '#fff', textAlign: 'center', height: 45, width: 45,backgroundColor:'#fff' }} />
            <TextInput keyboardType='numeric' ref={input4Ref} maxLength={1} style={{ fontSize: 19, borderWidth: 1, borderRadius: 7, borderColor: '#fff', textAlign: 'center', height: 45, width: 45,backgroundColor:'#fff' }} onChangeText={onChangeTextInput4} />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 5,color:'#fff' }}>Didn't get the code?</Text>
          {seconds > 0 ? (
            <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 16, color: 'red' }}>
              {`RESEND THE CODE IN ${seconds} SECONDS`}
            </Text>
          ) : (
            <Text onPress={handleResend} style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 16, color: 'red' }}>
              {'RESEND THE CODE'}
            </Text>
          )}
        </View>
        <View style={{ marginTop: 190, alignSelf: 'center', width: '100%', marginBottom: 20, backgroundColor: '#ffcb05', borderRadius: 10, }}>
          <Text style={{ fontFamily: 'BarlowCondensed-Medium', fontSize: 18, textAlign: 'center', paddingVertical: 10, color: '#FFFFFF', }} onPress={() => handleNavigation('homepage')}>PROCEED</Text>
        </View>

      </View>
    </ScrollView>

  )
}

