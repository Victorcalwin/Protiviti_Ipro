import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  TextInput,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DocumentPicker from 'react-native-document-picker'
import { cinemas } from '../../../iPro_BACKEND/app/models';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../../ENV';


const AuditorObservation = ({ navigation, route }) => {

  const [observe, setObserve] = useState();
  const [docFile, setdocFile] = useState(null)
  const department = route.params?.department;
  const allQuestions = route.params?.allQuestions;
  const optionValue = route.params?.answer;
  const Cinemas = route.params?.Cinemas;
  const depatmentval = route.params?.depatmentval;
  const data = route.params?.data;
  const moreDetails = route.params?.moreDetails;
  const [allquesAns, setAllQuesAns] = useState([])
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('')

  const objectsWithAnswerKey = allquesAns.filter(obj => obj.answer !== null && obj.answer !== undefined);

  // console.log(objectsWithAnswerKey.length,"answer key length")

  const getUserName = async () => {
    const user = await AsyncStorage.getItem('username');
    const parsedUser = JSON.parse(user);
    setUserName(parsedUser)
    const userId = await AsyncStorage.getItem('user');
    const parsedUserId = JSON.parse(userId);
    setUserId(parsedUserId)
  }

  useEffect(() => {
    quesAns()
    getUserName()

  }, [allQuestions])

  const quesAns = async () => {
    await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: depatmentval.deptId, auditId: Cinemas.id }).then((res) => {
      setAllQuesAns(res.data.data);
    })
  }

  const auditorobservsubmit = async () => {
    // const formData = new FormData();

    // formData.append('image', docFile);



    // if (formData) {
    //   let data = {
    //     auditId: Cinemas.id,
    //     deptId: depatmentval.deptId,
    //     observation: observe,
    //   };
    //   Object.entries(data).forEach(([key, value]) => {
    //     formData.append(`data[${key}]`, value);
    //   });
    //   // console.log(formData,"from form data ")

    //   await axios.post(
    //     `${ENV.API_END_POINT}audit_observation/audit-obser-submit`,
    //     formData,
    //     { headers: { 'Content-Type': 'multipart/form-data' } },
    //   );
    //   let commonIds = allQuestions.filter(obj1 => optionValue.some(obj2 => obj1.id === obj2.auditSchQuesId)).map(obj => obj.id);

    //   const count = allQuestions.filter(obj => commonIds.includes(obj.id)).length;

    //   //   console.log(count, allQuestionsArrlength, "sdnfkdsfksdfs")


    //   if (objectsWithAnswerKey.length === allquesAns.length) {
    //     navigation.navigate('auditorreview', { allQuestions: allQuestions, answer: optionValue, department: department, Cinemas: Cinemas, Observation: observe, depatmentval: depatmentval, data: data, moreDetails: moreDetails, allquesAns: allquesAns })
    //   }
    //   else {
    //     Alert.alert(
    //       'Error',
    //       'Please Submit all answer',
    //       [
    //         { text: 'Go Back', onPress: () => navigation.navigate('auditquestion', { department: department, data: data, allQuestions: allQuestions, Cinemas: Cinemas, depatmentval: depatmentval }) },
    //       ]
    //     );
    //   }
    // } else {
      // await axios.post(
      //   `${ENV.API_END_POINT}audit_observation/audit-obser-submit`,
      //   { auditId: Cinemas.id, deptId: depatmentval.deptId, observation: observe })
      let allQuestionsArrlength = allQuestions.length;
      let commonIds = allQuestions.filter(obj1 => optionValue.some(obj2 => obj1.id === obj2.auditSchQuesId)).map(obj => obj.id);

      const count = allQuestions.filter(obj => commonIds.includes(obj.id)).length;

      //   console.log(count, allQuestionsArrlength, "sdnfkdsfksdfs")


      if (objectsWithAnswerKey.length === allquesAns.length) {
        navigation.navigate('auditorreview', { allQuestions: allQuestions, answer: optionValue, department: department, Cinemas: Cinemas, Observation: observe, depatmentval: depatmentval, data: data, moreDetails: moreDetails, allquesAns: allquesAns })
      }
      else {
        Alert.alert(
          'Error',
          'Please Submit all answer',
          [
            { text: 'Go Back', onPress: () => navigation.navigate('auditquestion', { department: department, data: data, allQuestions: allQuestions, Cinemas: Cinemas, depatmentval: depatmentval }) },
          ]
        );
      }
    
  }
  const selectDoc = async () => {
    try {
      let result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const doc = {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
        size: result[0].size,
      };

      setdocFile(doc);

    } catch (err) {
      if (DocumentPicker.isCancel)
        console.log('User Cancelled the Upload', err);
      else console.log(err);
    }
  }

  // console.log("answerAPI",allquesAns)



  return (
    <SafeAreaView style={{ backgroundColor: '#000', height: '100%' }}>
      <TouchableNativeFeedback>
        <Image style={{ width: 15, height: 20, marginHorizontal: '2%', marginVertical: 15 }} source={require('../../images/BackArro.png')} />
      </TouchableNativeFeedback>
      <ScrollView>
        <View style={{ marginHorizontal: '5%' }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: '#e3b912' }}>AUDITOR'S OBSERVATIONS</Text>
            <Text style={{ color: '#fff' }}>Carnival Cinemas</Text>
          </View>
          <View style={{ backgroundColor: '#e3b912', width: '60%', paddingVertical: 7, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>{depatmentval.name}- {objectsWithAnswerKey.length}/{allQuestions.length} questions</Text>
          </View>

          {/* <View>
                        <Text style={{ marginVertical: 10,fontSize:13,fontWeight:'600',color:'#e3b912' }}>Enter your Observations</Text>
                        <TextInput placeholder='Start typing here...' style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15 }} multiline={true} onChangeText={(e)=>setObserve(e)} />
                    </View> */}
          {/* <View>
                        <Text style={{ marginVertical: 10,fontSize:13,fontWeight:'600',color:'#e3b912' }}>Add attachments (if any)</Text>
                        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center',color:'#e3b912' }}>Upload images here</Text>
                            <Text style={{ textAlign: 'center', backgroundColor: '#e3b912', marginVertical: 20, width: '60%', color: '#fff', paddingVertical: 15, alignSelf: 'center', borderRadius: 10 }} onPress={selectDoc}>UPLOAD IMAGE</Text>
                        </View>
                    </View> */}
          {/* <View>
                        <Text style={{ marginVertical: 10,fontSize:13,fontWeight:'600',color:'#e3b912' }}>{userName} (Auditor)</Text>
                        <TextInput placeholder='Sign here...' style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, }} multiline={true} />
                    </View> */}
          <View style={{ backgroundColor: '#e3b912', width: '90%', alignSelf: 'center', marginVertical: 50, borderRadius: 10, paddingVertical: 15 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }} onPress={() => auditorobservsubmit()}>PROCEED TO REVIEW THE AUDIT</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default AuditorObservation;
