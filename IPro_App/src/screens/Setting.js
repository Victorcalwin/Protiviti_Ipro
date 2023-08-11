import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableHighlight, TouchableNativeFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

export default function Setting({ navigation }) {
  const [isNotification, setIsNotification] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [selected, setSelected] = useState('')



  const options = [
    { key: '1', value: 'Tamil' },
    { key: '2', value: 'Hindi' },
    { key: '2', value: 'English UK' },


  ]

  return (
    <ScrollView style={{ backgroundColor: '#F9FAFE', flex: 1 }}>
      <View style={{ marginHorizontal: '4%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 35, }}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('sidebar')}>
            <Image
              source={require('../../images/back.png')}
            />
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginBottom: 20, }}>
          <Text
            style={{
              fontFamily: 'BarlowCondensed-Bold',
              fontWeight: 'bold',
              fontSize: 24,
              color: '#23233C',
            }}>
            SETTINGS
          </Text>
          <Text
            style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#3C3D3E' }}>
            Personalise your app settings
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'BarlowCondensed-Regular', fontSize: 20, color: '#004068', }}>Allow Notifications</Text>

          <TouchableOpacity style={{ height: 35, width: 80, borderRadius: 10, backgroundColor: isNotification ? '#DEF0F6' : '#E6E6E6', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setIsNotification(!isNotification)
            }}
          >
            <View style={{ height: '80%', width: '50%', backgroundColor: isNotification ? '#00A2B8' : '#FFFFFF', borderRadius: 10, alignSelf: isNotification ? 'flex-end' : 'flex-start', alignItems: 'center', justifyContent: 'center', }}></View>
          </TouchableOpacity>


        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'BarlowCondensed-Regular', fontSize: 20, color: '#004068', }}>Auto logout after 5 mins</Text>

          <TouchableOpacity style={{ height: 35, width: 80, borderRadius: 10, backgroundColor: isLogout ? '#DEF0F6' : '#E6E6E6', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setIsLogout(!isLogout)
            }}
          >
            <View style={{ height: '80%', width: '50%', backgroundColor: isLogout ? '#00A2B8' : '#FFFFFF', borderRadius: 10, alignSelf: isLogout ? 'flex-end' : 'flex-start', alignItems: 'center', justifyContent: 'center', }}></View>
          </TouchableOpacity>

        </View>

        <View style={{ backgroundColor: '#00A2B8',marginTop:'100%', marginBottom:20, width: '100%', justifyContent: 'center', alignSelf: 'center', paddingVertical: 15, borderRadius: 10, }}>
          <TouchableHighlight>
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }} onPress={() => navigation.navigate('sidebar')}>SAVE SETTINGS</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )
}