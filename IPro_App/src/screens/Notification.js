import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENV from '../../ENV';

export default Notification = ({ navigation }) => {
    const [userId, setUserId] = useState('')
    const [notification, setNotification] = useState([])
    const [unreadnotification, setUnreadNotification] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                //User ID
                const user = await AsyncStorage.getItem('user');
                const parsedUser = JSON.parse(user);
                setUserId(parsedUser)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        getUpdate(userId);
    }, [userId]);

    const getUpdate = async (id) => {
        try {
            await axios.get(`${ENV.API_END_POINT}CinemaDetails/${id}`).then(res => {
                const unreadNotifications = res.data.CinemasDetails.filter(detail => detail.notification_status === "UNREAD");
                const readNotifications = res.data.CinemasDetails.filter(detail => detail.notification_status === "READ");
                setNotification(unreadNotifications);
                setUnreadNotification(readNotifications)
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ScrollView style={{backgroundColor:'#000'}}>
            <View style={styles.container}>
                {/* Category and Bell icon */}
                <View style={{ marginHorizontal: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('sidebar')}>
                        <Image style={{ marginTop: 20 }}
                            source={require('../../images/hamburger.png')}
                        />
                    </TouchableNativeFeedback >
                </View>

                {/* Notification Title and Subtitle */}
                <View style={styles.header}>
                    <Text style={{ color: '#e3b912', fontWeight: 'bold', fontSize: 24, fontFamily: 'Barlow Condensed' }}>NOTIFICATIONS</Text>
                </View>
                <View style={styles.subHeader}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>You Have {notification.length} unread notifications</Text>
                </View>

                {/* Unread Notifications */}
                <View>
                    {
                        notification.map((data, index) => {
                            return (
                                <View style={styles.unread} key={index}>
                                    <Text style={{ paddingStart: 30, paddingTop: 15, fontSize: 16, fontWeight: '700', color: '#e3b912' }} onPress={() => navigation.navigate('notificationview', { Data: data })} >{data.auditName}</Text>
                                    <Text style={{ paddingStart: 30, fontSize: 16, color: '#fff' }}>{new Date(data.created_on).toLocaleString('en-IN')}</Text>
                                    <Text style={{ fontSize: 16, color: '#fff', textAlign: 'right', marginEnd: 30, fontWeight: 'bold' }}>Read more...</Text>
                                </View>
                            )
                        })
                    }
                </View>

                {/* Read Notification Title and notifications */}
                <View style={styles.read}>
                    <Text style={styles.clickRead}>Read Notification</Text>
                </View>

                {/* Read Notifications */}
                <View style={{ marginBottom: 30 }}>
                    {
                        unreadnotification ?
                            unreadnotification.map((data, index) => {
                                return (
                                    <View style={styles.unread1} key={index}>
                                        <Text style={{ paddingStart: 30, paddingTop: 15, fontSize: 16, fontWeight: 'bold',color:'#e3b912' }} >{data.auditName}</Text>
                                        <Text style={{ paddingStart: 30, fontSize: 16, color: '#fff' }}>{new Date(data.created_on).toLocaleString('en-IN')}</Text>
                                    </View>
                                )
                            }) : null
                    }
                </View>

            </View >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
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
        width: 25,
        height: 25,
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
    unread: {
        backgroundColor: '#000',
        height: 100,
        width: '100%',
        marginTop: 20
    },
    unread1: {
        backgroundColor: '#353535',
        height: 80,
        width: '100%',
        marginTop: 8
    },
    read: {
        flexDirection: 'row',
        paddingStart: 30,
        paddingRight: 30,
        marginTop: 20,
        marginBottom: 10
    },
    clickRead: {
        backgroundColor: '#DEF0F6',
        padding: 12,
        width: 180,
        textAlign: 'center',
        borderRadius: 10,
        color: '#004068'
    }
})

