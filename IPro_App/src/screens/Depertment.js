import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { RadioButton } from 'react-native-paper';
import axios from 'axios'
import { cinemas } from '../../../iPro_BACKEND/app/models';
import ENV from '../../ENV';
export default Depertment = ({ navigation, route }) => {
    const [value, setValue] = useState('');
    const [department, setDepartment] = useState([])

    // console.log("Departments", department)

    const Cinemas = route.params?.Cinemas;

    console.log(Cinemas, "adfjkasjdfoijas")

    useEffect(() => {
        departs()
    }, [])

    const departs = async () => {
        await axios.post(`${ENV.API_END_POINT}AuditScheduleDepartments/GetAuditBasedDepartment`, { auditId: Cinemas.id }).then((res) => {

            setDepartment(res.data);
        })


    };
    const Question = async (id) => {

        try {
            let res = await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: id, auditId: Cinemas.id })
            if (res.data.data === null || res.data.data === " " || res.data.data.length === 0) {
                console.log("There is no data in question")
            } else {
                navigation.navigate('auditdetails', { department: department, deptId: id, allQuestions: res.data.data, Cinemas: Cinemas, value: value })

            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>

            {/* Category and Bell icon */}
            <View style={styles.Heder}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('homepage')} >
                    <Image style={styles.category} source={require('../../images/BackArro.png')} />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('notification')}>
                    <Image style={styles.Bell} source={require('../../images/BellRed.png')} />
                </TouchableNativeFeedback>
            </View>
            <View style={styles.header}>
                <Text style={{ color: '#e3b912', fontWeight: 'bold', fontSize: 24, fontFamily: 'Barlow Condensed' }}>SELECT DEPARTMENT</Text>
            </View>
            <View style={styles.subHeader}>
                <Text style={{ color: '#fff', fontSize: 12, marginBottom: 10 }}>Carnival Cinemas</Text>
            </View>
            <ScrollView>

                <View>

                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

                        {department.map((item, key) => {
                            return (
                                <View style={styles.unread1} key={key}>
                                    <View style={{ marginStart: 30 }}>
                                        <RadioButton color='#e3b912' value={item.deptId} />
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={{ paddingStart: 30, paddingTop: 16, fontSize: 16, fontWeight: 'bold',color:'#fff' }} >{item.name}</Text>
                                    </View>
                                </View>
                            )
                        })
                        }




                    </RadioButton.Group>
                </View>
                <View style={styles.clicker}>
                    <Text style={styles.click} onPress={() => Question(value)}>PROCEED</Text>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
        backgroundColor:'#000'
    },
    Heder: {
        paddingStart: 30,
        paddingTop: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        width: 30,
        height: 30,
        marginTop: 7
    },
    Bell: {
        width: 45,
        height: 45,
    },
    header: {
        flexDirection: 'row',
        marginTop: 20,
        paddingStart: 30,
        paddingRight: 30,
    },
    subHeader: {
        flexDirection: 'row',
        paddingStart: 30,
        paddingRight: 30,
    },
    unread1: {
        backgroundColor: '#353535',
        height: 80,
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    click: {
        backgroundColor: '#e3b912',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        color: 'white',
        fontSize: 18,
        width: '100%',
    },
    clicker: {
        alignItems: 'center',
        padding: 30,
        marginTop: 20
    }
})