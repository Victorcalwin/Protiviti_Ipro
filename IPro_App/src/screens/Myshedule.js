import { View, Text, Image, TouchableHighlight, ScrollView, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import status_obj from "../audit_status"
import ENV from '../../ENV';

export default function Myshedule({ navigation, route }) {
    const [myshedules, setmyshedules] = useState([])

    useEffect(() => {
        myshedule()
    });

    const myshedule = async () => {
        try {
            await axios(`${ENV.API_END_POINT}CinemaDetails`).then(res => {
                setmyshedules(res.data.CinemasDetails);
            })
        } catch (error) {
            console.log(error);
        }
    }

    // current Date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <View
                style={{
                    marginHorizontal: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 35,
                }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('sidebar')}>
                    <Image style={{width:15,height:20,marginTop:20}} source={require('../../images/BackArro.png')} />
                </TouchableNativeFeedback>
            </View>
            <View
                style={{
                    marginHorizontal: '7%',
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View>
                    <Text
                        style={{
                            fontFamily: 'BarlowCondensed-Bold',
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: '#fff',
                        }}>
                        MY SCHEDULE
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                            color: '#e3b912',
                        }}>
                        Audit's Calender
                    </Text>
                </View>
                {/* <View>
                    <TouchableHighlight
                        style={{
                            backgroundColor: '#DEF0F6',
                            paddingVertical: 10,
                            paddingHorizontal: 35,
                            borderRadius: 10,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Lato-Regular',
                                fontSize: 14,
                                color: '#004068',
                            }}
                            onPress={() => navigation.navigate('filter')}>
                            Filter
                        </Text>
                    </TouchableHighlight>
                </View> */}
            </View>

            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 20, paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: '600',color:'#fff', fontFamily: 'BarlowCondensed-Medium', fontSize: 15, }}>{today}</Text>
                    <Text style={{ fontWeight: '600', fontFamily: 'BarlowCondensed-Medium', fontSize: 15, color: '#e3b912' }}>{myshedules.length > 0 ? myshedules.length : null} Audits</Text>
                </View>

                {
                    myshedules ? myshedules.map((data, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    backgroundColor: '#fff',
                                    marginHorizontal: '8%',
                                    borderRadius: 20,
                                    marginBottom: 10,
                                }}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text
                                        style={{
                                            width: '40%',
                                            color: '#fff',
                                            backgroundColor: status_obj[data.audit_status],
                                            textAlign: 'center',
                                            paddingVertical: 3,
                                            borderBottomLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                        }}>
                                        {data.audit_status}
                                    </Text>
                                </View>
                                <View style={{ paddingHorizontal: '6%' }}>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={{ color: '#00A2B8' }}>{data.auditName}</Text>
                                        <Text
                                            style={{ fontSize: 17, fontWeight: '500', color: '#004068' }}
                                        // onPress={() => HandleDepartment(data)}
                                        >
                                            {data.name}
                                        </Text>
                                        <Text
                                            style={{ fontSize: 12, fontWeight: '500', color: '#004068' }}>
                                            {data.start_date} - {data.end_date}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }) : <Text style={{ fontSize: 17, fontWeight: '500', color: '#004068', justifyContent: 'center', textAlign: 'center', alignContent: 'center', marginTop: '50%' }} >! No Audits</Text>
                }
            </ScrollView>
        </View>
    );
}
