import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  TouchableHighlight,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import { DonutChart } from "react-native-circular-chart";
import CalendarStrip from 'react-native-calendar-strip';
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Svg, Path } from "react-native-svg";
// import { Square } from "./packages/shape";
// import { Arc, ArcParams, ViewBox } from "./packages/svg";
// import { sum } from "./packages/array";
// import { LinearInterpolation } from "./packages/math";

import Pie from 'react-native-pie';
import axios from 'axios';
import status_obj from "../audit_status"
import ENV from '../../ENV';

export default function Homepage({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selected, setSelected] = useState('');
  const [cinimas, setCinimas] = useState([])
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // ... (rest of the code)

  // Function to handle onScroll event
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20; // Adjust this value as per your needs

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setRefreshFlag(true);
    }
  };



  console.log(selectedDate, "useStateValue")
  const options = cinimas.filter((item) => item.name).map((item) => item.name)
  const optionWithAll = ["All", ...options]

  const refresh = route.params?.refresh;

  const filterfirst = cinimas.filter((item) => item.audit_status == "In Progress" || item.audit_status == "Scheduled" || item.audit_status == "Sent to PMO")

  let filterData = filterfirst.filter((item) => item.start_date == selectedDate || item.end_date == selectedDate || item.start_date < selectedDate && item.end_date > selectedDate)

  let finalData;
  if (selected && selected != 'All') {
    finalData = filterfirst.filter((item) => item.name == selected && (item.start_date === selectedDate || item.end_date === selectedDate || (item.start_date < selectedDate && item.end_date > selectedDate)))
  } else {
    finalData = filterData
  }



  const handleDateSelected = date => {
    let newDate = new Date(date);
    let filterDate = newDate.toISOString().split("T")[0];
    setSelectedDate(filterDate);
    // console.log("Selected date", filterDate)
    let calendarfilter = filterData.filter((item) => item.start_date == filterDate);
    console.log("calendarfilter", calendarfilter)

  };




  console.log("selectedOptions", selected)
  const getData = async()=>{
    try {
      //User Name
      const username = await AsyncStorage.getItem('username');
      const parsedUsername = JSON.parse(username);
      setUser(parsedUsername);
      //User ID
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getMovie(userId);
  }, [userId, refresh]);

  useEffect(() => {
    
    if (refreshFlag) {
      getData();
      getMovie(userId);
      setRefreshFlag(false); 
    }
  }, [refreshFlag]);

  const getMovie = async (id) => {
    try {
      await axios.get(`${ENV.API_END_POINT}CinemaDetails/${id}`).then(res => {
        setCinimas(res.data.CinemasDetails);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleRefresh = () => {
    getData();
    getMovie(userId);
    setIsRefreshing(true);
  console.log("Refreshing the page")
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000); 
  };


  // console.log(filterData, "dfhasdhfiasdhf")

  //Distance Calculation;
  const toRadians = (degree) => {
    return degree * Math.PI / 180;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  };

  const desiredRangeInKm = 1;



  const HandleDepartment = async (data) => {
    try {
      // const storedLatitude = await AsyncStorage.getItem('Latitude');
      // const storedLongitude = await AsyncStorage.getItem('Longitude');
      const storedLatitude = '22.569076814087072';
      const storedLongitude = '88.43418442098023';

      const { latitude, longitude } = data;

      const distanceInKm = getDistance(latitude, longitude, parseFloat(storedLatitude), parseFloat(storedLongitude));


      if (distanceInKm <= desiredRangeInKm) {
        navigation.navigate('department', { Cinemas: data })
      } else {
        Alert.alert(
          'Location not within range',
          'Please go to the location to access it.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
    <ScrollView onScroll={handleScroll} refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor="#ffff"
      />
    }>
        <View>
          <View style={{ backgroundColor: '#000' }}>
            <View
              style={{
                marginHorizontal: '8%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('sidebar')}>
                <Image source={require('../../images/hamburger.png')} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('notification')}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../images/notification.png')}
                />
              </TouchableNativeFeedback>
            </View>
            <View
              style={{
                marginHorizontal: '8%',
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'BarlowCondensed-Bold',
                    fontWeight: '700',
                    fontSize: 19,
                    color: '#fff',
                  }}>
                  {user}

                </Text>
                {/* <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 12,
                    color: '#3C3D3E',
                  }}>
                  Sr. Audit Manager
                </Text> */}
              </View>
            </View>

            {/* <View style={{ marginTop: 10, paddingHorizontal: '8%' }}>
              <SelectList
                data={optionWithAll}
                setSelected={val => setSelected(val)}
                placeholder={'Select Cinema'}
                save="value"
                value={'English UK'}
                boxStyles={{
                  backgroundColor: '#353535',
                  marginVertical: 10,
                  height: 70,
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: '100%',
                  alignItems: 'center',
                  borderWidth: 0,
                }}
                inputStyles={{ color: '#e3b912', fontSize: 18 }}
                dropdownStyles={{
                  justifyContent: 'center',
                  backgroundColor: '#FFFF',
                  borderColor: '#fff',
                }}
                dropdownItemStyles={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 7,
                  fontSize: 14,
                  fontWeight: '600',
                  borderBottomColor: '#d1d1d1',
                  borderBottomWidth: 0.5,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginVertical: 2,
                }}
              />
            </View> */}
            <View style={{ backgroundColor: '#353535' }}>
              <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{
                  type: 'background',
                  highlightColor: '#e3b912',
                }}
                style={{
                  height: 100,
                  paddingTop: 40,
                  paddingBottom: 40,
                  position: 'relative',
                  elevation: 2,
                }}
                calendarHeaderStyle={{ color: '#fff' }}
                calendarColor={'#353535'}
                dateNumberStyle={{ color: '#fff' }}
                dateNameStyle={{ color: '#fff' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                onDateSelected={handleDateSelected}
                selectedDate={selectedDate}
                scrollable={false}
                showMonth={false}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '8%',
                marginVertical: 15,
              }}>
              <Text style={{ fontSize: 15, fontWeight: '600',color:'#fff' }}>
                Ongoing Audits
              </Text>
              <Text style={{ color: '#e3b912', fontSize: 15, fontWeight: '500' }}>
                {cinimas.length} Audits
              </Text>
            </View>
            {
              finalData.map((data, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      backgroundColor: '#353535',
                      marginHorizontal: '8%',
                      borderRadius: 20,
                      marginBottom: 10
                    }}>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          width: '40%',
                          color: '#fff',
                          backgroundColor: status_obj[data.audit_status],
                          textAlign: 'center',
                          paddingVertical: 3,
                          borderBottomLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}>
                        {data.audit_status}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: '6%' }}>
                      <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: '#e3b912' }}>{data.auditName}</Text>
                        <Text
                          style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}
                          onPress={() => HandleDepartment(data)}>
                          {data.name}
                        </Text>
                        <Text
                          style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>
                          {data.start_date} - {data.end_date}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
