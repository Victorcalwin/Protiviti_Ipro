import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const AuditUnderReview = ({navigation}) => {
  return (
    <SafeAreaView>
      <TouchableNativeFeedback onPress={()=> navigation.navigate('myaudit')}>
        <Image style={{ width: 25, height: 25, marginHorizontal: '5%', marginVertical: 15 }} source={require('../../images/BackArrow.png')} />
      </TouchableNativeFeedback>
      <ScrollView>
        <View style={{ marginBottom: 40, marginHorizontal: '7%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800' }}>AUDITOR REVIEW</Text>
              <Text>Carnival Cinemas</Text>
            </View>
            <View>
              <Text style={{ backgroundColor: '#def0f6', textAlign: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5 }}>Export</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: '#004068', fontSize: 13, fontWeight: '500', marginVertical: 20 }}>Dec 12, 2022 * 10:00am</Text>
          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: 20 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ width: '40%', color: '#fff', backgroundColor: '#f49926', textAlign: 'center', paddingVertical: 3, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }}>UNDER REVIEW</Text>
            </View>
            <View style={{ paddingHorizontal: '6%' }}>
              <View style={{ marginBottom: 15 }}>
                <Text>Cinema Name</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Carnival Cinemas</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text>Department</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Department Name</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text>Audit Category</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Cinema Audit</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text>Associated RGM</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>---</Text>
              </View>
              <View style={{ marginBottom: 45 }}>
                <Text>Address</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Sec 126, Noida</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Uttar Pradesh - 201301</Text>
              </View>
            </View>
          </View>
          {/* <View style={{ marginBottom: 15}} >
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
            </View> */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 19, marginBottom: 5, fontWeight: '600' }}>Observations</Text>
            <Text style={{ fontSize: 13 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 19, marginBottom: 5, fontWeight: '600' }}>Highlights & Summary</Text>
            <Text style={{ fontSize: 13, marginBottom: 10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={{ fontSize: 13 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default AuditUnderReview;
