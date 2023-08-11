import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  FlatList,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
  PermissionsAndroid,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import { RadioButton } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import CheckBox from 'react-native-checkbox';
import _ from 'lodash';
import axios from 'axios';
import socket from '../socketIO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';
import moment from 'moment';
import ENV from '../../ENV';


var criticality_obj = {
  Essential: '#89FE02',
  Critical: '#EC9E68',
  'Super Critical': '#FF5100',
  'Non Critical': '#FF8403',
  'Ultra Critical': '#FE0002',
};

const AuditQuestion = ({ navigation, route }) => {
  const [optionValue, setOptionValue] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [radioValue, setRadioValues] = useState([]);
  const [moreDetails, setMoreDetails] = useState([]);
  const [ImageResult, setImageResult] = useState({});
  const [moreValue, setMoreValue] = useState();
  const [indexArr, setIndexArr] = useState(0);
  const [rating, setRating] = useState(0);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [observation, setObservation] = useState()


  const [selectedValues, setSelectedValues] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [docFileObser, setDocFileObser] = useState(null);
  const [count, setCount] = useState(0);
  const [dbAns, setDbAns] = useState([])
  const [userID, setUserId] = useState();
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [timeStamp, setTimeStamp] = useState(null);



  let defaultAns = dbAns[indexArr] && dbAns[indexArr].answer;
  let QuestionScore = dbAns[indexArr] && dbAns[indexArr].score;

  const [answer, setAnswer] = useState();

  const [textarea, setTextarea] = useState(null);

  const options = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: false,
    saveToPhotos: true,
    cameraType: 'back',
    includeExtra: true,
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await launchCamera(options, async (res) => {
        const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss');
        await setCameraPhoto(res.assets[0].uri);
        await setTimeStamp(timeStamp);
        await setImageResult(res);
      });

    }
  };




  const handleCheckboxChange = value => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.replace(value + ',', ''));
    } else {
      setSelectedValues(selectedValues + value + ',');
    }
  };

  const handleRating = value => {
    setRating(value);
    onPressRadioButton(
      value,
      allQuestions[indexArr].id,
      allQuestions[indexArr].Q_Type,
    );
  };

  const department = route.params?.department;
  var allQuestions = route.params?.allQuestions;
  const Cinemas = route.params?.Cinemas;
  const depatmentval = route.params?.depatmentval;
  const data = route.params?.data;
  const id = route.params?.id;
  let arr = department
  let arr2 = Cinemas
  useEffect(() => {
    getDbAns()
  }, [indexArr])

  let getDbAns = async () => {
    let res = await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: arr[0].deptId, auditId: arr2.id })
    setDbAns(res.data.data)
    setAnswer(res.data.data[indexArr].answer)
    setUserId(await AsyncStorage.getItem('user'))
  }


  const socketSenddata = async (AuditId, quesId) => {
    let data = {
      AuditId,
      quesId,
      room: 'updateQuestion',
    };
    await socket.emit('send_message', data);
  };

  const socketconnect = () => {
    socket.emit('question_update', 'updateQuestion');

  };
  useEffect(() => {
    socketconnect();
  }, []);

  useEffect(() => {
    if (id == undefined) {
      console.log('this is not edit');
    } else {
      setIndexArr(id);
      console.log('This is edit');
    }
    if (allQuestions[indexArr].Q_Type == 'text' && textarea != '') {
      onPressRadioButton(
        textarea,
        allQuestions[indexArr].id,
        allQuestions[indexArr].Q_Type,
      );
    }
    if (allQuestions[indexArr].Q_Type == 'quantity') {
      onPressRadioButton(
        count,

        allQuestions[indexArr].id,
        allQuestions[indexArr].Q_Type,
      );
    }
  }, [id, count]);

  function onPressRadioButton(radioButtonsArray, schlId, Q_Type) {
    const index = optionValue.findIndex(item => item.auditSchQuesId === schlId);
    if (index !== -1) {
      const newArr = [...optionValue];
      if (Q_Type == 'single') {
        setAnswer(radioButtonsArray);
      } else if (Q_Type == 'multiple') {
        if (newArr[index].answer != radioButtonsArray) {
          newArr[index].answer = newArr[index].answer + ',' + radioButtonsArray;
          setAnswer(radioButtonsArray);
        } else if (Q_Type == 'text') {
          setAnswer(radioButtonsArray);
        }
      } else if (Q_Type == 'rating') {
        setAnswer(radioButtonsArray);
      } else if (Q_Type == 'quantity') {
        setAnswer(radioButtonsArray);
      }
      setOptionValue(newArr);
    } else {
      if (Q_Type == 'single') {
        setAnswer(radioButtonsArray);
      } else if (Q_Type == 'multiple') {
        setAnswer(prevState => {
          if (prevState && prevState.includes(radioButtonsArray)) {
            return radioButtonsArray;
          } else if (prevState) {
            return prevState + ',' + radioButtonsArray;
          } else {
            return radioButtonsArray;
          }
        });
      } else if (Q_Type == 'rating') {
        setAnswer(radioButtonsArray);
      } else if (Q_Type == 'text') {
        setAnswer(radioButtonsArray);
      } else if (Q_Type == 'quantity') {

        setAnswer(radioButtonsArray);
      }
    }
  }

  const hanldeProceedNext = async (defaultAns) => {
   if(id == undefined){
    let changeindex = false;
    let index = indexArr;
    if (index >= allQuestions.length - 1) {
      index = allQuestions.length;
    } else {
      index = index + 1;
    }

    if (allQuestions[indexArr] && allQuestions[indexArr].answer && allQuestions[indexArr].answer == answer) {
      setIndexArr(index)
    }
    else {
      if (index <= allQuestions.length) {
        if (allQuestions[indexArr].is_mandatory === 'yes') {
          if (answer !== '' && answer !== undefined && answer !== null) {
            const values = allQuestions[indexArr].options.map(obj => parseFloat(obj.value)).filter(value => !isNaN(value));
            const sortedValue = values.sort((a, b) => a - b)
            const lowerNumber = sortedValue.slice(0, 2)
            if (sortedValue[0] == answer && allQuestions[indexArr].criticality != '' && allQuestions[indexArr].criticality != null) {
              
              if (moreValue != "" && moreValue != null && moreValue != 'undefined' && ImageResult && ImageResult.assets && ImageResult.assets[0] && ImageResult.assets[0].fileName && ImageResult.assets[0].type && ImageResult.assets[0].uri) {
                
                
                await axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userID, Role_Id: 2, audit_schedule_id: allQuestions[indexArr].audit_schedule_id, department_Id: allQuestions[indexArr].audit_schedule_department_id, audit_schedule_questionnaire_id: allQuestions[indexArr].id, comments: moreValue })
                const formData = new FormData();

                if (ImageResult && ImageResult.assets[0]) {
                  formData.append('image', {
                    uri: ImageResult.assets[0].uri,
                    type: ImageResult.assets[0].type,
                    name: ImageResult.assets[0].fileName,
                    // name: ImageResult.assets[0].timestamp,
                  });
                  formData.append('timestamp', timeStamp);
                }


                if (formData) {
                  let data = {
                    auditId: allQuestions[indexArr].audit_schedule_id,
                    questionId: allQuestions[indexArr].question_id,
                    answers: answer,
                    moreDetail: moreValue,
                    observation: observation,
                    userId: userID,
                  };
                  console.log(data, "sdnfsddnkf")
                  Object.entries(data).forEach(([key, value]) => {
                    formData.append(`data[${key}]`, value);
                  });
                  await axios.post(
                    `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } },
                  ).then((res) => {
                    if (index === allQuestions.length) {
                      handleNavigate();
                    }
                  });
                } else {
                  await axios.post(
                    `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                    {
                      auditId: allQuestions[indexArr].audit_schedule_id,
                      questionId: allQuestions[indexArr].question_id,
                      answers: answer,
                      moreDetail: moreValue,
                      observation: observation,
                      userId: userID,
                    },
                  ).then((res) => {
                    if (index === allQuestions.length) {
                      handleNavigate();
                    }
                  });
                }

                await axios.post(`${ENV.API_END_POINT}Notification/push-notification-non-compliance`, {
                  auditId: allQuestions[indexArr].audit_schedule_id,
                  departmentId: allQuestions[indexArr].audit_schedule_department_id,
                  questionId: allQuestions[indexArr].question_id,
                  answer: answer,
                  senderId: userID
                  
                }).then((res)=>{
                  // console.log(res,'uuuuuuu')
                })

                setAnswer()
                setMoreValue();
                setRating();
                setDocFile();
                setCount("");
                setTextarea(null);
                setRadioValues();
                setCheckedValues([])
                setObservation()
                setCameraPhoto('');
                 setImageResult({});


                if (index === allQuestions.length) {
                  setIndexArr(index - 1)
                } else {
                  setIndexArr(index);
                }

                socketSenddata(
                  allQuestions[indexArr].audit_schedule_id,
                  allQuestions[indexArr].question_id,
                );


              } else {
                Alert.alert("Detail and image are mandatory.")
              }
            }
            else {
              console.log("vjvjjvjvjj")
              if (allQuestions[indexArr] && allQuestions[indexArr].Is_Attachment_Req == 'Yes') {
                console.log(ImageResult, "sdfsdf");
                if (ImageResult && ImageResult.assets && ImageResult.assets[0] && ImageResult.assets[0].fileName && ImageResult.assets[0].type && ImageResult.assets[0].uri) {
                  console.log(ImageResult, indexArr, index, allQuestions.length, "sdnbfnksdbf");
                  const formData = new FormData();

                  if (ImageResult && ImageResult.assets[0]) {
                    formData.append('image', {
                      uri: ImageResult.assets[0].uri,
                      type: ImageResult.assets[0].type,
                      name: ImageResult.assets[0].fileName,
                    });
                    formData.append('timestamp', timeStamp);
                  }

                  if (formData) {
                    let data = {
                      auditId: allQuestions[indexArr].audit_schedule_id,
                      questionId: allQuestions[indexArr].question_id,
                      answers: answer,
                      moreDetail: moreValue,
                      observation: observation,
                      userId: userID,
                    };

                    Object.entries(data).forEach(([key, value]) => {
                      formData.append(`data[${key}]`, value);
                    });

                    await axios.post(
                      `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                      formData,
                      { headers: { 'Content-Type': 'multipart/form-data' } },
                    ).then((res) => {
                      if (indexArr === (allQuestions.length - 1)) {
                        handleNavigate();
                      }
                    });
                  }
                  else {
                    await axios.post(
                      `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                      {
                        auditId: allQuestions[indexArr].audit_schedule_id,
                        questionId: allQuestions[indexArr].question_id,
                        answers: answer,
                        moreDetail: moreValue,
                        observation: observation,
                        userId: userID,
                      },
                    ).then((res) => {

                      if (index === allQuestions.length) {
                        handleNavigate();
                      }
                    });
                  }

                  // Clearing values
                  setAnswer('');
                  setMoreValue('');
                  setRating('');
                  setDocFile('');
                  setCount('');
                  setTextarea(null);
                  setRadioValues('');
                  setCheckedValues([]);
                  setObservation('');
                  setCameraPhoto('');
                  setImageResult({});

                  if (index === allQuestions.length) {
                    setIndexArr(index - 1);
                  } else {
                    setIndexArr(index);
                  }

                  socketSenddata(
                    allQuestions[indexArr].audit_schedule_id,
                    allQuestions[indexArr].question_id,
                  );
                } else {
                  console.log("dsfsdfd");
                  Alert.alert("Image is mandatory field.");
                }

              }
              else {
                console.log("vjvjjvjvjj123")
                await axios.post(
                  `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                  {
                    auditId: allQuestions[indexArr].audit_schedule_id,
                    questionId: allQuestions[indexArr].question_id,
                    answers: answer,
                    moreDetail: moreValue,
                    observation: observation,
                    userId: userID,
                  },
                ).then((res) => {

                  if (index === allQuestions.length) {
                    handleNavigate();
                  }
                });

                setAnswer()
                setMoreValue();
                setRating();
                setDocFile();
                setCount("");
                setTextarea(null);
                setRadioValues();
                setCheckedValues([])
                setObservation()
                setCameraPhoto('');
                setImageResult({});

                if (index === allQuestions.length) {
                  setIndexArr(index - 1)
                } else {
                  setIndexArr(index);
                }


                socketSenddata(
                  allQuestions[indexArr].audit_schedule_id,
                  allQuestions[indexArr].question_id,
                );
              }

            }
          }
          else {
            Alert.alert("Kindly fill Answer")
          }
        }
      }
    }
   }else{
    let changeindex = false;
    let index = indexArr;
    if (index >= allQuestions.length - 1) {
      index = allQuestions.length;
    } else {
      index = index + 1;
    }

    if (allQuestions[indexArr] && allQuestions[indexArr].answer && allQuestions[indexArr].answer == answer) {
      setIndexArr(index)
    }
    else {
      if (index <= allQuestions.length) {
        if (allQuestions[indexArr].is_mandatory === 'yes') {
          if (answer !== '' && answer !== undefined && answer !== null) {
            const values = allQuestions[indexArr].options.map(obj => parseFloat(obj.value)).filter(value => !isNaN(value));
            const sortedValue = values.sort((a, b) => a - b)
            const lowerNumber = sortedValue.slice(0, 2)
            if (sortedValue[0] == answer && allQuestions[indexArr].criticality != '' && allQuestions[indexArr].criticality != null) {
              
              if (moreValue != "" && moreValue != null && moreValue != 'undefined' && ImageResult && ImageResult.assets && ImageResult.assets[0] && ImageResult.assets[0].fileName && ImageResult.assets[0].type && ImageResult.assets[0].uri) {
                
                
                await axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userID, Role_Id: 2, audit_schedule_id: allQuestions[indexArr].audit_schedule_id, department_Id: allQuestions[indexArr].audit_schedule_department_id, audit_schedule_questionnaire_id: allQuestions[indexArr].id, comments: moreValue })
                const formData = new FormData();

                if (ImageResult && ImageResult.assets[0]) {
                  formData.append('image', {
                    uri: ImageResult.assets[0].uri,
                    type: ImageResult.assets[0].type,
                    name: ImageResult.assets[0].fileName,
                    // name: ImageResult.assets[0].timestamp,
                  });
                  formData.append('timestamp', timeStamp);
                }


                if (formData) {
                  let data = {
                    auditId: allQuestions[indexArr].audit_schedule_id,
                    questionId: allQuestions[indexArr].question_id,
                    answers: answer,
                    moreDetail: moreValue,
                    observation: observation,
                    userId: userID,
                  };
                  console.log(data, "sdnfsddnkf")
                  Object.entries(data).forEach(([key, value]) => {
                    formData.append(`data[${key}]`, value);
                  });
                  await axios.post(
                    `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } },
                  ).then((res) => {
                    
                      handleNavigate();
                    
                  });
                } else {
                  await axios.post(
                    `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                    {
                      auditId: allQuestions[indexArr].audit_schedule_id,
                      questionId: allQuestions[indexArr].question_id,
                      answers: answer,
                      moreDetail: moreValue,
                      observation: observation,
                      userId: userID,
                    },
                  ).then((res) => {
                    
                      handleNavigate();
                    
                  });
                }

                await axios.post(`${ENV.API_END_POINT}Notification/push-notification-non-compliance`, {
                  auditId: allQuestions[indexArr].audit_schedule_id,
                  departmentId: allQuestions[indexArr].audit_schedule_department_id,
                  questionId: allQuestions[indexArr].question_id,
                  answer: answer,
                  senderId: userID
                  
                }).then((res)=>{
                  // console.log(res,'uuuuuuu')
                })

                setAnswer()
                setMoreValue();
                setRating();
                setDocFile();
                setCount("");
                setTextarea(null);
                setRadioValues();
                setCheckedValues([])
                setObservation()
                setCameraPhoto('');
                 setImageResult({});



                socketSenddata(
                  allQuestions[indexArr].audit_schedule_id,
                  allQuestions[indexArr].question_id,
                );


              } else {
                Alert.alert("Detail and image are mandatory.")
              }
            }
            else {
              console.log("vjvjjvjvjj")
              if (allQuestions[indexArr] && allQuestions[indexArr].Is_Attachment_Req == 'Yes') {
                console.log(ImageResult, "sdfsdf");
                if (ImageResult && ImageResult.assets && ImageResult.assets[0] && ImageResult.assets[0].fileName && ImageResult.assets[0].type && ImageResult.assets[0].uri) {
                  console.log(ImageResult, indexArr, index, allQuestions.length, "sdnbfnksdbf");
                  const formData = new FormData();

                  if (ImageResult && ImageResult.assets[0]) {
                    formData.append('image', {
                      uri: ImageResult.assets[0].uri,
                      type: ImageResult.assets[0].type,
                      name: ImageResult.assets[0].fileName,
                    });
                    formData.append('timestamp', timeStamp);
                  }

                  if (formData) {
                    let data = {
                      auditId: allQuestions[indexArr].audit_schedule_id,
                      questionId: allQuestions[indexArr].question_id,
                      answers: answer,
                      moreDetail: moreValue,
                      observation: observation,
                      userId: userID,
                    };

                    Object.entries(data).forEach(([key, value]) => {
                      formData.append(`data[${key}]`, value);
                    });

                    await axios.post(
                      `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                      formData,
                      { headers: { 'Content-Type': 'multipart/form-data' } },
                    ).then((res) => {
                      
                        handleNavigate();
                      
                    });
                  }
                  else {
                    await axios.post(
                      `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                      {
                        auditId: allQuestions[indexArr].audit_schedule_id,
                        questionId: allQuestions[indexArr].question_id,
                        answers: answer,
                        moreDetail: moreValue,
                        observation: observation,
                        userId: userID,
                      },
                    ).then((res) => {

                      
                        handleNavigate();
                      
                    });
                  }

                  // Clearing values
                  setAnswer('');
                  setMoreValue('');
                  setRating('');
                  setDocFile('');
                  setCount('');
                  setTextarea(null);
                  setRadioValues('');
                  setCheckedValues([]);
                  setObservation('');
                  setCameraPhoto('');
                  setImageResult({});

              

                  socketSenddata(
                    allQuestions[indexArr].audit_schedule_id,
                    allQuestions[indexArr].question_id,
                  );
                } else {
                  console.log("dsfsdfd");
                  Alert.alert("Image is mandatory field.");
                }

              }
              else {
                console.log("vjvjjvjvjj123")
                await axios.post(
                  `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                  {
                    auditId: allQuestions[indexArr].audit_schedule_id,
                    questionId: allQuestions[indexArr].question_id,
                    answers: answer,
                    moreDetail: moreValue,
                    observation: observation,
                    userId: userID,
                  },
                ).then((res) => {

                 
                    handleNavigate();
                  
                });

                setAnswer()
                setMoreValue();
                setRating();
                setDocFile();
                setCount("");
                setTextarea(null);
                setRadioValues();
                setCheckedValues([])
                setObservation()
                setCameraPhoto('');
                setImageResult({});

          

                socketSenddata(
                  allQuestions[indexArr].audit_schedule_id,
                  allQuestions[indexArr].question_id,
                );
              }

            }
          }
          else {
            Alert.alert("Kindly fill Answer")
          }
        }
      }
    }
   }
  }


  const closeModal = () => {
    setModalVisible(false);
  };


  const toggleModal1 = item => {
    setIsModalVisible1(!isModalVisible1);
  };


  const toggleModal = async () => {

    if (observation != "" && observation != undefined) {

      const formData = new FormData();

      formData.append('image', docFileObser);


      if (formData) {
        let data = {
          user_id: 2,
          Role_Id: 2,
          audit_schedule_id: allQuestions[indexArr].audit_schedule_id,
          department_Id: allQuestions[indexArr].audit_schedule_department_id,
          audit_schedule_questionnaire_id: allQuestions[indexArr].id,
          comments: observation
        };
        Object.entries(data).forEach(([key, value]) => {
          formData.append(`data[${key}]`, value);
        });

        //console.log(formData, "djdudfduhfduhf")

        await axios.post(
          `${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        setModalVisible(false);
        setIndexArr(indexArr + 1)


      } else {
        await axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: 2, Role_Id: 2, audit_schedule_id: allQuestions[indexArr].audit_schedule_id, department_Id: allQuestions[indexArr].audit_schedule_department_id, audit_schedule_questionnaire_id: allQuestions[indexArr].id, comments: observation })
        setModalVisible(false);
      }
    } else {
      Alert.alert("This Field is mandatory")
    }

  }

  const handleNavigate = () => {
    navigation.navigate('auditobservation', {
      allQuestions: allQuestions,
      answer: optionValue,
      department: department,
      Cinemas: Cinemas,
      depatmentval: depatmentval,
      data: data,
    });
   
  };



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

      setDocFile(doc);
    } catch (err) {
      if (DocumentPicker.isCancel)
        console.log('User Cancelled the Upload', err);
      else console.log(err);
    }
  };

  const selectDocObser = async () => {
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

      setDocFileObser(doc);
      //console.log(doc, "jdjdjdjdjdjdjdj")
    } catch (err) {
      if (DocumentPicker.isCancel)
        console.log('User Cancelled the Upload', err);
      else console.log(err);
    }
  };


  const hanldeProceedPrev = () => {
    let index = indexArr;
    if (index > 0) {
      index = index - 1;
    }
    setIndexArr(index);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#000', height: '100%' }}>
      {/* <StatusBar backgroundColor='#e3b912' /> */}
      <TouchableNativeFeedback>
        <Image
          style={{
            width: 15,
            height: 20,
            marginHorizontal: '2%',
            marginVertical: 15,
          }}
          source={require('../../images/BackArro.png')}
        />
      </TouchableNativeFeedback>

      <ScrollView>
        <View style={{ marginBottom: 40, marginHorizontal: '5%' }}>
          <View
            style={{
              backgroundColor: '#e3b912',
              width: '100%',
              paddingVertical: 7,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              {depatmentval.name}- Questions:- {indexArr + 1}/
              {allQuestions.length}{' '}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#353535',
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
            key={indexArr}>
            {allQuestions[indexArr].criticality ? (
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    width: '40%',
                    marginTop: -10,
                    marginRight: -9,
                    color: '#fff',
                    backgroundColor:
                      criticality_obj[allQuestions[indexArr].criticality],
                    textAlign: 'center',
                    paddingVertical: 3,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 10,
                  }}>
                  {' '}
                  {allQuestions[indexArr].criticality}
                </Text>
              </View>
            ) : (
              ''
            )}

            <View style={{ alignItems: 'flex-start' }} key={indexArr}>
              <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#e3b912' }}>Question: {indexArr + 1}</Text>
                  {
                    allQuestions[indexArr].is_mandatory == 'yes' ? <Text style={{ color: 'red', marginLeft: 10 }}>*</Text> : null
                  }

                </View>
                <Text
                  style={{ marginVertical: 10, fontSize: 15, fontWeight: '600', color: '#fff' }}>
                  {allQuestions.length > 0 && allQuestions[indexArr].question}

                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity onPress={item => toggleModal1(item)}>
                  <Image
                    source={{ uri: allQuestions[indexArr].imagePath }}
                    style={{
                      // height: 70,
                      width: 70,
                      marginHorizontal: 5,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
                <Modal
                  isVisible={isModalVisible1}
                  onBackdropPress={key => toggleModal1(key)}>
                  <Image
                    source={{ uri: allQuestions[indexArr].imagePath }}
                    style={{
                      width: 300,
                      height: 300,
                      alignItems: 'center',
                      marginLeft: 25,
                    }}
                  />
                </Modal>
              </View>
              <View style={{ fontSize: 12 }}>
                {allQuestions[indexArr].Q_Type === 'single' ? (
                  //  ***************************** Radio Button ***************************************

                  <RadioButton.Group
                    value={answer && answer != '' && answer != null ? answer : checkedValues}
                    onValueChange={value => {
                      setCheckedValues(value);
                      onPressRadioButton(
                        value,
                        allQuestions[indexArr].audit_schedule_id,
                        allQuestions[indexArr].Q_Type,
                        allQuestions[indexArr].question_id,
                      ); // call your onPressRadioButton function
                    }}
                    flexDirection="row">
                    {allQuestions[indexArr].options.map(option => (
                      <View key={option.id} style={{ flexDirection: 'row' }}>
                        <RadioButton color='#e3b912' value={option.value} />
                        <Text style={{ marginTop: 8, color: '#fff' }}>{option.label}</Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                ) : allQuestions[indexArr].Q_Type === 'multiple' ? (
                  // ***************************Check Box***************************************

                  allQuestions[indexArr].options.map((option, index) => (
                    <View key={option.value} style={{ flexDirection: 'row' }}>
                      <CheckBox
                        key={index}
                        label={option.label}
                        value={option.value}
                        checked={dbAns[indexArr].answer.includes(option.value) || selectedValues.includes(option.value)}
                        onChange={value => {
                          handleCheckboxChange(option.value);
                          onPressRadioButton(
                            option.value,
                            allQuestions[indexArr].id,
                            allQuestions[indexArr].Q_Type,
                          );
                        }}
                      />
                    </View>
                  ))
                ) : allQuestions[indexArr].Q_Type === 'text' ? (
                  // ***************************Text Area *********************************************

                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        width: '100%',
                      }}
                      multiline={true}
                      numberOfLines={6}
                      onChangeText={text => setTextarea(text)}
                      onChange={() => {
                        onPressRadioButton(
                          textarea,
                          allQuestions[indexArr].id,
                          allQuestions[indexArr].Q_Type,
                        );
                      }}
                      value={textarea === null && dbAns[indexArr] && dbAns[indexArr].answer ? dbAns[indexArr].answer : textarea}
                    />
                  </View>
                ) : allQuestions[indexArr].Q_Type === 'rating' ? (
                  // *************************************** Star Rating ***********************************

                  <StarRating
                    style={{
                      marginHorizontal: '10%',
                    }}
                    rating={rating == undefined && dbAns[indexArr] && dbAns[indexArr].answer ? dbAns[indexArr].answer : rating}
                    onChange={handleRating}
                    maxStars={6}
                    enableHalfStar={false}
                  />
                ) : allQuestions[indexArr].Q_Type === 'quantity' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Pressable
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 22,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: '#fff',
                      }}
                      onPress={() => {
                        var initVal = dbAns[indexArr] && dbAns[indexArr].answer && (count == 0 || count == '') ? parseInt(dbAns[indexArr].answer) : parseInt(count) //if Database answer present  ? DBANSWER : 0
                        //if plus hasbeen clicked
                        setCount(initVal - 1)
                      }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
                    </Pressable>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderColor: '#000',
                        width: 160,
                      }}
                      keyboardType="number-pad"
                      value={answer ? answer.toString() : (dbAns[indexArr] && dbAns[indexArr].answer ? dbAns[indexArr].answer : '0')}
                      onChange={() => {
                        onPressRadioButton(
                          count,
                          allQuestions[indexArr].id,
                          allQuestions[indexArr].Q_Type,
                        );
                      }}
                    />
                    <Pressable
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 22,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: '#fff',
                      }}
                      onPress={() => {
                        var initVal = dbAns[indexArr] && dbAns[indexArr].answer && count == '' ? parseInt(dbAns[indexArr].answer) : parseInt(count) //if Database answer present  ? DBANSWER : 0
                        //if plus hasbeen clicked
                        setCount(initVal + 1)
                      }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            </View>
            <View>
             
            </View>
            {allQuestions[indexArr].Q_Type === 'text' ? null : (
              <View>
                <Text style={{ marginVertical: 10, color: '#e3b912' }}>Add more details</Text>
                <TextInput
                  placeholder="Start typing here..."
                  style={{
                    backgroundColor: '#F3F5F5',
                    borderRadius: 10,
                    paddingHorizontal: 15,
                  }}
                  multiline={true}
                  onChangeText={e => setMoreValue(e)}
                />
              </View>
            )}

           
            <View>
              <Text style={{ marginVertical: 10, color: '#e3b912' }}>Add attachments</Text>
              <Text
                style={{
                  textAlign: 'center',
                  backgroundColor: '#e3b912',
                  marginVertical: 10,
                  width: '60%',
                  color: '#fff',
                  paddingVertical: 10,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
                onPress={openCamera}>
                OPEN CAMERA
              </Text>
              {
                cameraPhoto ? (
                  <ImageBackground style={{ width: 250, height: 250, alignSelf: 'center', marginTop: 5 }} source={{ uri: cameraPhoto }}>
                    <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center', marginTop: 60 }}>{timeStamp}</Text>
                  </ImageBackground>
                ) : null
              }
              
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 10,
                borderRadius: 10,
                paddingVertical: 15,
              }}>
              <View style={{ backgroundColor: '#e3b912', borderRadius: 3 }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: 100,
                  }}
                  onPress={() => {
                    hanldeProceedPrev();
                  }}>
                  Previous
                </Text>
              </View>
              <View style={{ backgroundColor: '#e3b912', borderRadius: 3 }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: 100,
                  }}
                  onPress={() => {
                    hanldeProceedNext(defaultAns);
                  }}>
                  Next
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditQuestion;
