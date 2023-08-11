import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Svg, { Defs, Path, G, Circle, ClipPath, LinearGradient, RadialGradient, Stop, } from 'react-native-svg';

export default function Sidebar({ navigation }) {
  return (
    <ScrollView style={styled.container}>
      <View >
        <View style={{ marginHorizontal:'5%' }}>
          <View style={styled.closeWapper}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('homepage')}>
              <Image
                source={require('../../images/close_logo.png')}
                style={{ justifyContent: 'center', alignSelf: 'center',backgroundColor:'#fff',borderRadius:50 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ marginBottom: 30, }}>
            <Text
              style={{
                fontFamily: 'BarlowCondensed-Bold',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#fff',
              }}>
              MENU
            </Text>
            <Text
              style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#e3b912' }}>
              Browse iPro Edge
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginVertical: 10, }}>
            <Image
              source={require('../../images/Profile.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginRight: 20, }}
            />
            <Text style={{
              fontFamily: 'BarlowCondensed-Bold',

              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('myprofile')} >My Profile</Text>
            <TouchableNativeFeedback onPress={() => navigation.navigate('myprofile')}>
            <Image
              source={require('../../images/Arrow.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, position: 'absolute', right: 5, top: 8, }}
            />
            </TouchableNativeFeedback>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginVertical: 10, }}>
            <Image
              source={require('../../images/MySchedule.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginRight: 20, }}
            />
            <Text style={{
              fontFamily: 'BarlowCondensed-Bold',

              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('myshedule')} >My Schedule</Text>
            <TouchableNativeFeedback onPress={() => navigation.navigate('myshedule')}>
            <Image
              source={require('../../images/Arrow.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, position: 'absolute', right: 5, top: 8, }}
            />
            </TouchableNativeFeedback>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginVertical: 10, }}>
            <Image
              source={require('../../images/Audits.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginRight: 20, }}
            />
            <Text style={{
              fontFamily: 'BarlowCondensed-Bold',

              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('myaudit')}>My Audits</Text>
            <TouchableNativeFeedback onPress={() => navigation.navigate('myaudit')}>
            <Image
              source={require('../../images/Arrow.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, position: 'absolute', right: 5, top: 8, }}
            />
            </TouchableNativeFeedback>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginVertical: 10, }}>
            <Image
              source={require('../../images/Settings.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginRight: 20, }}
            />
            <Text style={{
              fontFamily: 'BarlowCondensed-Bold',

              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('setting')}>Settings</Text>
            <TouchableNativeFeedback onPress={() => navigation.navigate('setting')}>
            <Image
              source={require('../../images/Arrow.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, position: 'absolute', right: 5, top: 8, }}
            />
            </TouchableNativeFeedback>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginVertical: 10, }}>
            <Image
              source={require('../../images/Logout1.png')}
              style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginRight: 20, }}
            />
            <Text style={{
              fontFamily: 'BarlowCondensed-Bold',

              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('login')}>Logout</Text>
          </View>
        </View>
        {/* <View style={{ position: 'relative', bottom: 0, left: 0, right: 0, width: "100%" }}>
          <View style={{ width: '100%', marginTop: 30, }}>
            <SvgComponent style={{ width: '100%', }} />
          </View>
          <View style={{ position: 'absolute', flexDirection: 'row', bottom: 110, left: 25, }}>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular', color: '#5D789A', }}>Terms of use</Text>
            <Text style={{ fontSize: 12, marginHorizontal: 15, fontFamily: 'Lato-Regular', color: '#5D789A', }}>Disclimar</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular', color: '#5D789A', }}>Privacy policy</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 50, left: 40, }}>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular', color: '#5D789A', }}>Ver 1.0.0</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular', color: '#5D789A', }}>&#169; Protiviti Inc. All Rights Reserved.</Text>
          </View>
        </View> */}

        <View>

        </View>
      </View>
    </ScrollView>



  );
}

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={'100%'}
      height={321}
      viewBox="0 0 375 321"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 2163"
            transform="translate(0 491)"
            fill="#fff"
            stroke="#707070"
            strokeWidth={1}
            d="M0 0H375V321H0z"
          />
        </ClipPath>
        <LinearGradient
          id="b"
          x1={0.5}
          x2={0.5}
          y2={0.907}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#19a2b8" />
          <Stop offset={1} stopColor="#19a2b8" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <G
        data-name="Graph Artwork"
        transform="translate(0 -491)"
        clipPath="url(#a)"
      >
        <G data-name="Group 16151">
          <G
            data-name="Group 16150"
            opacity={0.489}
            fill="none"
            stroke="#000"
            strokeWidth={1}
            strokeDasharray="2 4"
          >
            <G
              data-name="Group 16148"
              transform="translate(473.525 318.584) translate(-481.772 191.526)"
              opacity={0.3}
            >
              <Path data-name="Line 3" d="M0 0L0 369.021" />
              <Path
                data-name="Line 3"
                transform="translate(102.023)"
                d="M0 0L0 369.021"
              />
              <Path
                data-name="Line 3"
                transform="translate(203.323)"
                d="M0 0L0 369.021"
              />
              <Path
                data-name="Line 3"
                transform="translate(305.347)"
                d="M0 0L0 369.021"
              />
              <Path
                data-name="Line 3"
                transform="translate(406.646)"
                d="M0 0L0 369.021"
              />
            </G>
            <G
              data-name="Group 16149"
              transform="translate(473.525 318.584) translate(-563.525 231.209)"
              opacity={0.2}
            >
              <Path data-name="Line 4" d="M552.084 0L0 0" />
              <Path
                data-name="Line 4"
                transform="translate(0 66.568)"
                d="M552.084 0L0 0"
              />
              <Path
                data-name="Line 4"
                transform="translate(0 133.86)"
                d="M552.084 0L0 0"
              />
              <Path
                data-name="Line 4"
                transform="translate(0 200.429)"
                d="M552.084 0L0 0"
              />
              <Path
                data-name="Line 4"
                transform="translate(0 266.997)"
                d="M552.084 0L0 0"
              />
            </G>
          </G>
          <Path
            data-name="Path 1412"
            d="M-69.002 713.931l15.616-25.5h21.661l56.2-20.769v-21.929l72.423-25.655 23.291 25.655 43.7 15.518 51.569-15.518 21.27-12.526 41.85-23.172 30.967 10.044 24.153-10.045 48.3-57.469"
            fill="none"
            stroke="#00a2b8"
            strokeWidth={3}
          />
          <Path
            data-name="Path 1413"
            d="M-69.002 719.88l15.616-25.5h21.661l56.2-20.769v-21.929l72.423-25.655 23.291 25.655 43.7 15.518 51.569-15.518 21.27-12.526 41.85-23.172 30.967 10.044 24.153-10.045 48.3-57.469"
            fill="none"
            stroke="#5d7b9a"
            strokeWidth={3}
            opacity={0.701}
          />
          <Path
            data-name="Path 1955"
            d="M.055 1.282l16.589-9.341L34 0v187H0z"
            transform="translate(263.123 625)"
            fill="url(#b)"
          />
        </G>
      </G>
    </Svg>
  )
}




const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },
  closeWapper: {
    marginTop:20
  },
});
