import { View, Text, Image, TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Checklist2({ navigation }) {
    return (
        <ScrollView style={{ backgroundColor: '#000', flex: 1 }}>
            <View >
                <View style={{ marginHorizontal: '4%' }}>

                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                        <Image style={styles.Group} source={require('../../images/pvr.png')} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Image style={styles.Financial} source={require('../../images/Check3.png')} />
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', marginVertical: 30, }}>
                    <View style={{width:20,height:20,backgroundColor:'#E3E3E3',borderRadius:50}}>
                            <Text style={{textAlign:'center', color: '#fff', }}>1</Text>
                        </View>
                        <View style={{width:20,height:20,backgroundColor:'#E3E3E3',borderRadius:50,marginHorizontal:5}}>
                            <Text style={{textAlign:'center', color: '#fff', }}>2</Text>
                        </View>
                        <View style={{width:20,height:20,backgroundColor:'#e3b912',borderRadius:50}}>
                            <Text style={{textAlign:'center', color: '#fff', }}>3</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'BarlowCondensed-Regular', fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Cinema Audit Checklist</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Lato-Regular', fontSize: 12, color: '#fff', marginVertical: 12, }}>The greatest glory in living lies not in never falling, but in rising every time we fall. </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ paddingVertical: 10, backgroundColor: '#e3b912', textAlign: 'center', color: '#fff', fontWeight: 'bold', borderRadius: 10, }} onPress={() => navigation.navigate('login')} >LOGIN</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    category: {
        width: 30,
        height: 30,
        marginTop: 7,
        marginStart: 10
    },
    Group: {
        height: 100,
        width: 100
    },
    // Financial: {
    //     height: 270,
    //     width: 330
    // }
})