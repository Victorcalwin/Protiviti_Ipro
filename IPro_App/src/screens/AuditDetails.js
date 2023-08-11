import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import axios from 'axios'
import audit_status from '../audit_status'
import { cinemas } from '../../../iPro_BACKEND/app/models';
import ENV from '../../ENV';

const AuditDetails = ({ navigation, route }) => {

  const [dbAns, setDbAns] = useState([])

  const department = route.params?.department;
  const deptId = route.params?.deptId;
  const allQuestions = route.params?.allQuestions;
  const value = route.params?.value;
  const Cinemas = route.params?.Cinemas;
  const [data, setData] = useState({})
  let arr = department
  let arr2 = Cinemas

  console.log(deptId, "kjahsdfkasdkf")

  console.log("alhjfghjklklons", arr)
  useEffect(() => {

    getrgm()

  }, [])

  const getrgm = async () => {
    let res = await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: deptId, auditId: arr2.id })
    await setDbAns(res.data.data)
    let inputData = {
      auditId: Cinemas.id,
      deptId: value
    }
    await axios.post(`${ENV.API_END_POINT}CinemaDetails/get-rgm`, inputData).then(res => {
      setData(res.data.CinemasDetails);

    })
  };



  const allHaveAnswer = dbAns.every(obj => obj.hasOwnProperty('answer') && obj.answer !== '' && obj.answer !== null);




  let depatmentval = department.find((elem) => elem.deptId === value)



  // console.log(data, "cgcchcgchgcg")

  const hadleSubmit = async () => {
    try {
      let data = {
        "auditId": Cinemas.id,
        "status": "In Progress"
      }
      await axios.post(`${ENV.API_END_POINT}AuditStatusReport/update-audit-status`, data)
    } catch (error) {
      console.log(error);
    }
    if (allHaveAnswer == false) {
      navigation.navigate('auditquestion', { department: department, deptId: deptId, data: data, allQuestions: allQuestions, Cinemas: Cinemas, depatmentval: depatmentval })
    } else {
      Alert.alert("This Audit has been Completed")
    }
  }

  return (
    <SafeAreaView style={{backgroundColor:'#000',height:'100%'}}>
      <TouchableNativeFeedback>
        <Image style={{ width: 15, height: 20, marginHorizontal: '5%', marginVertical: 15 }} source={require('../../images/BackArro.png')} />
      </TouchableNativeFeedback>
      <ScrollView>
        <View style={{ marginBottom: 40, marginHorizontal: '7%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800',color:'#e3b912' }}>AUDIT DETAILS</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500', marginVertical: 20 }}>{Cinemas.start_date} - {Cinemas.end_date}</Text>
          </View>
          <View style={{ backgroundColor: '#353535', borderRadius: 20, marginBottom: 20 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ width: '40%', color: '#fff', backgroundColor: audit_status[Cinemas.audit_status], textAlign: 'center', paddingVertical: 3, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }}>{Cinemas.audit_status}</Text>
            </View>
            <View style={{ paddingHorizontal: '6%' }}>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Cinema Name</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>{Cinemas.name}</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text  style={{color:'#e3b912'}}>Department</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>{depatmentval.name}</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Audit Category</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>{data.length > 0 ? data[0].scheduling_type === 'cinema' ? 'Cinema' : data[0].scheduling_type : ""}</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Associated RGM</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>{data.length > 0 ? data[0].Rgm ? data[0].Rgm : '---' : ""}</Text>
              </View>
              <View style={{ marginBottom: 45 }}>
                <Text style={{color:'#e3b912'}}>Address</Text>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>{Cinemas.address}</Text>
                {/* <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Uttar Pradesh - 201309</Text> */}
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#e3b912', paddingVertical: 10, borderRadius: 10, marginBottom: 30 }}>
            <Text style={{ textAlign: 'center', color: '#fff', }} onPress={() => hadleSubmit()}>{allHaveAnswer == true ? "Audit Completed" : "Start the Audit"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default AuditDetails;
