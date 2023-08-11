import { View, Text, Image, Button, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import ENV from '../../ENV';

export default function Myprofile({navigation}) {
  const [ userId, setUserId] = useState('');
  const [ data, setData] = useState([])
  // console.log(userId,"UserId")
  // console.log(data,"UserId")

  const getUserId = async()=>{
    const user = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser)
  }
  const getAllUser = async()=>{
    axios
    .get(`${ENV.API_END_POINT}UsersLogin/Get_Users`)
    .then((res) => {
        setData(res.data)
    })
  }
  useEffect(()=>{
    getUserId()
    getAllUser()
  },[])

  const userData = data.filter((item)=>item.id == userId)


  return (
    <ScrollView style={{ backgroundColor:'#000', flex:1,}}>
    {userData.length > 0 ? (
      <>
      <View style={{marginHorizontal:'7%',}} >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginVertical: 35,}}>
      {/* <TouchableNativeFeedback onPress={()=> navigation.navigate('sidebar')}>
      <Image
            source={require('../../images/back.png')}
       />
        </TouchableNativeFeedback> */}
     
   
      </View>
      <View style={{marginBottom: 20,}}>
            <Text
            style={{
                fontFamily: 'BarlowCondensed-Bold',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#fff',
            }}>
            MY PROFILE
            </Text>
            <Text
            style={{fontFamily: 'Lato-Regular', fontSize: 12, color: '#e3b912'}}>
            Edit or update your profile
            </Text>
      </View>
      
      <View style={{position: 'relative', marginHorizontal: 10, }}>
      <Image
            source={require('../../images/dummy_background.png')} style={{padding: 70,}}
       />
      
      <Image
            source={require('../../images/dummy_img.png')} style={{marginTop: 30, position: 'absolute', marginLeft: 29,  justifyContent: 'center',}}
       />
        <View style={{padding: 16, position: 'absolute', bottom: -5, left: 110, borderRadius: 40, backgroundColor: '#00406819'}}>
        <Image
            source={require('../../images/lock_img.png')}/>
       </View>
    
      </View>

     <View style={{backgroundColor:'#353535', marginVertical: 20, borderRadius: 20, paddingVertical: 15,}}>
        <View style={{paddingHorizontal: 30, paddingVertical: 10,}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:12, color: '#fff'}}>Employee name</Text>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:16, color: '#e3b912'}}>{userData[0].first_name + " "+ userData[0].last_name}</Text>
        </View>
        <View style={{paddingHorizontal: 30, paddingVertical: 10,}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:12, color: '#fff'}}>Employee role</Text>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:16, color: '#e3b912'}}>{userData[0].name}</Text>
        </View>
        <View  style={{paddingHorizontal: 30, paddingVertical: 10,}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:12, color: '#fff'}}>Email address</Text>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:16, color: '#e3b912'}}>{userData[0].email}</Text>
        </View>
        <View style={{paddingHorizontal: 30, paddingVertical: 10,}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:12, color: '#fff'}}>Phone number</Text>
            <Text style={{fontFamily: 'Lato-Regular', fontSize:16, color: '#e3b912'}}>{userData[0].mobile}</Text>
        </View>
     </View>

     <TouchableHighlight style={{backgroundColor: '#e3b912', justifyContent: 'center', alignItems: 'center', paddingVertical: 15,marginVertical:30, borderRadius: 10,}}>
         <Text style={{textAlign: 'center', color: '#fff'}} onPress={()=> navigation.navigate('editprofile')}>EDIT MY PROFILE</Text>
    </TouchableHighlight>
     
      

    </View>
      </>
    ) : ( <Text>No user data available.</Text>)}
    </ScrollView>
  )
}