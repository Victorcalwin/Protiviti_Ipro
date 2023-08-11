import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import ENV from '../../ENV'

export default Notificationview = ({ navigation, route }) => {
  const value = route.params?.Data

  useEffect(() => {
    notificationUpdate()
  }, [])

  const notificationUpdate = async () => {
    try {
      await axios.post(`${ENV.API_END_POINT}Notification/${value.id}`).then((data) => {
        console.log(data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={{backgroundColor:'#000'}}>
      <View style={styles.container}>
        {/* Arrow and Bell icon */}
        <View style={styles.Heder}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('notification')} >
            <Image style={styles.Arrow} source={require('../../images/BackArro.png')} />
          </TouchableNativeFeedback>
          {/* <View >
          <Image style={styles.Bell} source={require('../../images/Bell.png')} />
        </View> */}
        </View>

        {/* Notification Time and date */}
        <View style={styles.date}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{new Date(value.created_on).toLocaleString('en-IN')}</Text>
        </View>

        {/* Notification Tittle */}
        <View style={styles.tittle}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, fontFamily: 'Barlow Condensed',color:'#e3b912' }}>{value.auditName}</Text>
        </View>

        {/* Notification Text */}
        <View style={styles.notification}>
          {/* <ScrollView> */}
          <Text style={{ fontSize: 12, fontWeight: 'bold',color:'#fff' }}>
            {value.name}
            {'\n'}
            {'\n'}
            {value.address}
          </Text>
          {/* </ScrollView> */}
        </View>

        {/* Status */}
        <View style={styles.tittle}>
          <Text style={{ fontSize: 18, fontFamily: 'Barlow Condensed',color:'#fff' }}>Status Changed as <Text style={{ color: '#e3b912', fontWeight: 'bold' }}>{value.audit_status}</Text></Text>
        </View>

        {/* Mark as Unread Button */}
        {/* <View style={styles.unread}>
          <Button color={'#00A2B8'} title='Mark as unread'/>
          <Text style={styles.click} onPress={() => navigation.navigate('notification')}>MARK AS UNREAD</Text>
        </View> */}

      </View >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 30,
    marginHorizontal: '7%',
  },
  Heder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  Arrow: {
    width: 15,
    height: 20,
    marginTop: 20
  },
  Bell: {
    width: 45,
    height: 45,
  },
  date: {
    flexDirection: 'row',
    marginTop: 20,
    fontFamily: 'Barlow Condensed'
  },
  tittle: {
    flexDirection: 'row',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  notification: {
    marginTop: 20
  },
  unread: {
    // position: 'absolute',
    // bottom: 50,
    // left: 30,
    width: '100%',
    marginTop: '70%',
    marginBottom: 30,
  },
  click: {
    backgroundColor: '#00A2B8',
    textAlign: 'center',
    // padding: 18,
    paddingVertical: 10,
    borderRadius: 10,
    color: 'white',
    fontSize: 15
  }
})
