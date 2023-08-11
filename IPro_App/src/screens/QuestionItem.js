// import React from "react";
// import { View, Text, Dimensions, FlatList, TouchableOpacity, ScrollView, TextInput } from "react-native";
// import DocumentPicker from 'react-native-document-picker'
// import RadioGroup from 'react-native-radio-buttons-group';


// const { height, width } = Dimensions.get('window')

// const QuestionItem = (data, navigation,route) => {

//     // const department = route.params?.department;
//     var allQuestions = route.params?.allQuestions;
//     // const Cinemas = route.params?.Cinemas;

//     const selectDoc = async () => {
//         try {
//             let doc = await DocumentPicker.pick()
//             console.log(doc)
//         } catch (err) {
//             if (DocumentPicker.isCancel)
//                 console.log("User Cancelled the Upload", err)
//             else
//                 console.log(err)
//         }
//     }

//     const handleNavigate = () => {
//         navigation.navigate('auditobservation', { allQuestions: allQuestions, answer: optionValue, department: department, Cinemas: Cinemas })

//     }
//     return (
//         <ScrollView>
//             <View style={{ width: width }}>
//                 <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10, marginHorizontal: 20 }}>{data.data.question}</Text>
//                 <FlatList
//                     data={data.data.options}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <TouchableOpacity
//                                 style={{
//                                     width: '90%',
//                                     height: 30,
//                                     elevation: 3,
//                                     backgroundColor: '#fff',
//                                     marginVertical: 5,
//                                     alignSelf: 'center',
//                                     justifyContent: 'center',
//                                     paddingLeft: 10
//                                 }}>
//                                 {allQuestions.map((item, index) =>
//                                     <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 15 }}>
//                                         <View style={{ marginBottom: 20 }}>
//                                             <Text style={{ color: '#004068' }}>Question: {index + 1}</Text>
//                                             <Text style={{ marginVertical: 10, fontSize: 15, fontWeight: '600' }}>{item.question}</Text>
//                                         </View>
//                                         <View>
//                                             <RadioGroup
//                                                 style={{ alignItems: 'flex-start' }}
//                                                 radioButtons={item.options}
//                                                 onPress={() => { onPressRadioButton(item.options, item.id) }}
//                                             />
//                                         </View>
//                                     </View>
//                                 )}
//                                 <Text>
//                                     {index == 0 ? 'A' : 'B'}
//                                 </Text>
//                             </TouchableOpacity>
//                         )
//                     }}
//                 />
//             </View>
//             <View style={{ marginHorizontal: '2%' }}>
//                 <Text style={{ marginVertical: 10 }}>Add more details</Text>
//                 <TextInput placeholder='Start typing here...' style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 }} multiline={true} />
//             </View>
//             <View style={{ marginHorizontal: '2%' }}>
//                 <Text style={{ marginVertical: 10 }}>Add attachments</Text>
//                 <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
//                     <Text style={{ textAlign: 'center' }}>Upload images here</Text>
//                     <Text style={{ textAlign: 'center', backgroundColor: '#00A2B8', marginVertical: 10, width: '60%', color: '#fff', paddingVertical: 5, alignSelf: 'center', borderRadius: 10 }} onPress={selectDoc}>UPLOAD IMAGE</Text>
//                 </View>
//             </View>
//             <View style={{ backgroundColor: '#004068', width: '90%', alignSelf: 'center', marginVertical: 20, borderRadius: 10, paddingVertical: 15 }}>
//                 <Text style={{ color: '#fff', textAlign: 'center' }} onPress={() => handleNavigate()}>PROCEED TO NEXT</Text>
//             </View>
//         </ScrollView>
//     )
// }
// export default QuestionItem;