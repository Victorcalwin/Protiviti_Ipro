import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Edit from '../../images/edit.png';
import StarRating from 'react-native-star-rating-widget';
import ENV from '../../ENV';

const AuditorReview = ({ navigation, route }) => {
  // AllQuestion
  const [refresh, setARefresh] = useState(true);
  const department = route.params?.department;
  const allQuestions = route.params?.allQuestions;
  const optionValue = route.params?.answer;
  const ABobserver = route.params?.Observation;
  const Cinemas = route.params?.Cinemas;
  const depatmentval = route.params?.depatmentval;
  const data = route.params?.data;
  const moreDetails = route.params?.moreDetails;
  const allquesAns = route.params?.allquesAns;

  const [alldeptAns, setAllDeptAns] = useState([]);

  // const combinedArray = alldeptAns.flatMap(innerArray => [...innerArray])

  // console.log(combinedArray,"dfghjkfghjklkjhgc")

  console.log(alldeptAns, 'asdnkaghjklsdnf');
  var criticality_obj = {
    Essential: '#89FE02',
    Critical: '#FEC803',
    'Super Critical': '#FF5100',
    'Non Critical': '#FF8403',
    'Ultra Critical': '#FE0002',
  };

  const getrgm = async () => {
    let arr = [];
    for (let i = 0; i <= department.length; i++) {
      if (department[i] && department[i].deptId) {
        let res = await axios.post(
          `${ENV.API_END_POINT}QuestionnaireByDepartment`,
          { depatmentId: department[i].deptId, auditId: Cinemas.id },
        );
        arr = arr.concat(res.data.data);
      }
    }
    setAllDeptAns(arr);

  };
  useEffect(() => {
    getrgm();
  }, []);
  const allHaveAnswer = alldeptAns.every(
    obj =>
      obj.hasOwnProperty('answer') && obj.answer !== '' && obj.answer !== null,
  );
  console.log(allHaveAnswer, 'jjdjdjjdjj');


  const handleSubmit = async () => {
    try {
      let status;
      if (allHaveAnswer == false) {
        status = "In Progress"
      } else {
        status = "Sent to PMO"
      }
      await axios.post(
        `${ENV.API_END_POINT}AuditStatusReport/update-audit-status`,
        { status: status, auditId: Cinemas.id },
      );
      navigation.navigate('homepage', { refresh: refresh });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = id => {
    navigation.navigate('auditquestion', {
      allQuestions: allQuestions,
      answer: optionValue,
      department: department,
      Cinemas: Cinemas,
      id: id,
      depatmentval: depatmentval,
      refresh: refresh,
    });
  };

  // const handleEdit=()=>{
  //     navigation.navigate('auditquestion',{department:department,allQuestions:allQuestions,Cinemas:Cinemas})
  // }

  return (
    <SafeAreaView style={{backgroundColor:'#000',height:'100%'}}>
      <ScrollView>
        <View style={{ marginTop: '20%', marginHorizontal: '5%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800',color:'#e3b912' }}>
                AUDITOR REVIEW
              </Text>
              <Text style={{color:'#fff'}}>{Cinemas.name}</Text>
            </View>
            {/* <View>
              <Text
                style={{
                  backgroundColor: '#e3b912',
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 5,
                  color:'#fff'
                }}>
                Export
              </Text>
            </View> */}
          </View>
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: '500',
                marginVertical: 20,
              }}>
              {Cinemas.start_date} - {Cinemas.end_date}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#353535',
              borderRadius: 20,
              marginBottom: 20,
            }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  width: '40%',
                  color: '#fff',
                  backgroundColor: '#00A28F',
                  textAlign: 'center',
                  paddingVertical: 3,
                  borderBottomLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                {Cinemas.audit_status}
              </Text>
            </View>
            <View style={{ paddingHorizontal: '6%' }}>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Cinema Name</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>
                  {Cinemas.name}
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Department</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>
                  {depatmentval.name}
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Audit Category</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>
                  {data && data.length > 0
                    ? data[0].scheduling_type === 'cinema'
                      ? 'Cinema'
                      : data[0].scheduling_type
                    : ''}
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={{color:'#e3b912'}}>Associated RGM</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>
                  {data && data.length > 0
                    ? data[0].Rgm
                      ? data[0].Rgm
                      : '---'
                    : ''}
                </Text>
              </View>
              <View style={{ marginBottom: 45 }}>
                <Text style={{color:'#e3b912'}}>Address</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>
                  {Cinemas.address}
                </Text>
                {/* <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}>Uttar Pradesh - 201301</Text> */}
              </View>
            </View>
          </View>

          {allquesAns.map((data, i) => (
            // data.criticality === "ultra critical" ? styles.critical : (data.criticality === "high" ? styles.high : (data.criticality === "medium" ? styles.medium : styles.low))

            <View
              key={i}
              style={{
                backgroundColor: '#353535',
                marginVertical: 5,
                borderRadius: 15,
              }}>
              {/* <Icon name="rocket" type="font-awesome" size={30} color="#900" /> */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleEdit(i);
                  }}>
                  <Image style={{ width: 20, height: 20,backgroundColor:'#fff' }} source={Edit} />
                </TouchableOpacity>

                <View style={{ alignItems: 'flex-end', width: 250 }}>
                  <Text
                    style={{
                      width: '40%',
                      color: '#fff',
                      backgroundColor: criticality_obj[data.criticality],
                      textAlign: 'center',
                      paddingVertical: 3,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}>
                    {' '}
                    {data.criticality}{' '}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 8,
                  color: '#fff',
                  paddingHorizontal: 10,
                }}>
                {data.question}
              </Text>
              {data.Q_Type == 'rating' ? (
                <StarRating
                  style={{
                    marginHorizontal: '10%',
                  }}
                  rating={data.answer ? parseInt(data.answer) : 0}
                  maxStars={data.answer ? parseInt(data.answer) : 0}
                  enableHalfStar={false}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 19,
                    marginBottom: 8,
                    marginLeft: 15,
                    fontWeight: '600',
                    color:'#fff'
                  }}
                  key={i}>
                  {data.answer}
                </Text>
              )}
            </View>
          ))}

          <View>
            <Text
              style={{
                fontSize: 19,
                marginBottom: 8,
                fontWeight: '600',
                color: '#e3b912',
              }}>
              Auditor Observation
            </Text>
            <Text style={{ fontSize: 13, marginBottom: 8 }}>{ABobserver}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: '5%',
            }}>
            {/* <View style={{ backgroundColor: '#00A28F',width:"40%", borderRadius: 10, paddingVertical: 10}}>
                        <Text style={{ color: '#fff', textAlign: 'center' }} onPress={() => handleEdit()} >EDIT THE ULTRA CRITICAL QUESTIONS</Text>
                    </View> */}
            <View
              style={{
                backgroundColor: '#e3b912',
                width: '100%',
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{ color: '#fff', textAlign: 'center' }}
                onPress={() => handleSubmit()}>
                SUBMIT REPORT FOR REVIEW
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditorReview;

const styles = StyleSheet.create({
  ultracritical: {
    width: '40%',
    color: '#fff',
    backgroundColor: 'red',
    textAlign: 'center',
    paddingVertical: 3,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 3,
  },
  superCritical: {
    paddingHorizontal: 3,
    width: '40%',
    color: '#fff',
    backgroundColor: 'orange',
    textAlign: 'center',
    paddingVertical: 3,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Critical: {
    paddingHorizontal: 3,
    width: '40%',
    color: '#000',
    backgroundColor: 'yellow',
    textAlign: 'center',
    paddingVertical: 3,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
