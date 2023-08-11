import { View, Text, ScrollView, TouchableNativeFeedback, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
// import { DonutChart } from "react-native-circular-chart";
import CalendarStrip from 'react-native-calendar-strip'
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Svg, Path } from "react-native-svg";
// import { Square } from "./packages/shape";
// import { Arc, ArcParams, ViewBox } from "./packages/svg";
// import { sum } from "./packages/array";
// import { LinearInterpolation } from "./packages/math";

export default function Homepage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selected, setSelected] = useState('')

  const handleDateSelected = (date) => {
    setSelectedDate(date);
    // console.log(date);
  };

  const options = [
    { key: '1', value: 'Carnival Cinemas' },
    { key: '2', value: 'PVR' },
    { key: '3', value: 'INOX' },
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ backgroundColor: '#F9FAFE' }}>
            <View style={{ marginHorizontal: '8%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15, }}>
              <TouchableNativeFeedback onPress={() => navigation.navigate('sidebar')}>
                <Image
                  source={require('../../images/menu.png')}
                />
              </TouchableNativeFeedback >
              <TouchableNativeFeedback onPress={() => navigation.navigate('notification')}>
                <Image style={{ width: 40, height: 40 }}
                  source={require('../../images/notification.png')}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={{ marginHorizontal: '8%', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'BarlowCondensed-Bold',
                    fontWeight: '700',
                    fontSize: 19,
                    color: '#23233C',
                  }}>
                  DEEPAK SINGH
                </Text>
                <Text
                  style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#3C3D3E' }}>
                  Sr. Audit Manager
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10, paddingHorizontal: '8%', }}>
              <SelectList
                data={options}
                setSelected={(val) => setSelected(val)}
                placeholder={'Carnival Cinemas'}
                save="value"
                value={'English UK'}
                boxStyles={{ backgroundColor: '#FFFF', marginVertical: 10, height: 70, justifyContent: 'space-between', alignSelf: 'center', width: '100%', alignItems: 'center', borderWidth: 0, }}
                inputStyles={{ color: '#00A2B8', fontSize: 16, }}
                dropdownStyles={{ justifyContent: 'center', backgroundColor: '#FFFF', borderColor: '#fff', }}
                dropdownItemStyles={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 7, fontSize: 14, fontWeight: '600', borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginVertical: 2, }} />
            </View>
            <View style={{backgroundColor:'#fff'}}>
              <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30, }}
                daySelectionAnimation={{ type: 'background', highlightColor: '#ADD8E6' }}
                style={{ height: 100, paddingTop: 40, paddingBottom: 40, position: 'relative', elevation: 2, }}
                calendarHeaderStyle={{ color: '#fff' }}
                calendarColor={'#FFFFF'}
                dateNumberStyle={{ color: '#000' }}
                dateNameStyle={{ color: '#000' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                onDateSelected={handleDateSelected}
                selectedDate={selectedDate}
                scrollable={false}
                showMonth={false}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '8%', marginVertical: 15 }}>
              <Text style={{ fontSize: 15, fontWeight: '600' }}>Ongoing Audits</Text>
              <Text style={{ color: '#EA7024', fontSize: 15, fontWeight: '500' }}>2 Audits</Text>
            </View>
            <View style={{ backgroundColor: '#fff', marginHorizontal: '8%', borderRadius: 20 }}>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ width: '40%', color: '#fff', backgroundColor: '#00A28F', textAlign: 'center', paddingVertical: 3, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }}>IN PROGRESS</Text>
              </View>
              <View style={{ paddingHorizontal: '6%' }}>
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ color: '#00A2B8' }}>Store Audit</Text>
                  <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }} onPress={() => navigation.navigate('department')} >Carnival Cinemas</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#004068' }}>Mar 18th,2023</Text>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: '8%', marginVertical: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>AUDIT SUMMARY</Text>
              <Text>Recent Audits</Text>
            </View>
            <View style={{ backgroundColor: '#fff', marginHorizontal: '8%', marginBottom: 15, padding: 15, borderRadius: 15 }} >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#00A2B8' }}>Store Audit</Text>
                <Text style={{ fontSize: 11, marginTop: 5 }}>Mar 18th, 2023</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '500',marginBottom:10 }}>Carnival Cinemas</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '25%' }}>
                  <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center',paddingVertical:15, fontSize: 30 }}>14</Text>
                    <Text style={{ width: 15, height: 15, backgroundColor: 'red', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>ESSENTIAL</Text>
                  </View>
                </View>
                <View style={{ width: '25%' }}>
                  <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center',paddingVertical:15, fontSize: 30 }}>9</Text>
                    <Text style={{ width: 15, height: 15, backgroundColor: '#F49926', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>CRITICAL</Text>
                  </View>
                </View>
                <View style={{ width: '25%' }}>
                  <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center',paddingVertical:15, fontSize: 30 }}>34</Text>
                    <Text style={{ width: 15, height: 15, backgroundColor: '#004068', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>NON-CRITICAL</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: '8%', marginBottom: 40 }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>ANALYTICS</Text>
              <Text>Department wise</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}