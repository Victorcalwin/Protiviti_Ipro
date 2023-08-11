import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const AuditInProgress = ({ navigation }) => {


  return (
    <SafeAreaView>
      <TouchableNativeFeedback onPress={() => navigation.navigate('myaudit')}>
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
              <Text style={{ width: '40%', color: '#fff', backgroundColor: '#00A28F', textAlign: 'center', paddingVertical: 3, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }}>IN PROGRESS</Text>
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
          {/* <View style={{ marginBottom: 25 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '25%' }}>
                <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', paddingVertical: 15, fontSize: 30 }}>2</Text>
                  <Text style={{ width: 15, height: 15, backgroundColor: 'red', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>ESSENTIAL</Text>
                </View>
              </View>
              <View style={{ width: '25%' }}>
                <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', paddingVertical: 15, fontSize: 30 }}>0</Text>
                  <Text style={{ width: 15, height: 15, backgroundColor: '#F49926', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>CRITICAL</Text>
                </View>
              </View>
              <View style={{ width: '25%' }}>
                <View style={{ backgroundColor: '#f4f5fa', borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', paddingVertical: 15, fontSize: 30 }}>7</Text>
                  <Text style={{ width: 15, height: 15, backgroundColor: '#004068', position: 'absolute', right: 0, bottom: 0, borderRadius: 50 }}></Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', color: '#004068' }}>NON-CRITICAL</Text>
                </View>
              </View>
            </View>
          </View> */}
          <View style={{ backgroundColor: '#004068', paddingVertical: 10, borderRadius: 10, marginBottom: 30 }}>
            <Text style={{ textAlign: 'center', color: '#fff', }}>COMPLETE THE AUDIT</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default AuditInProgress;
