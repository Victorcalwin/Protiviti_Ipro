import { View, Text, Image, TouchableHighlight, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
export default function EditProfile({ navigation }) {

  const [selected, setSelected] = useState("");




  const options = [
    { key: '1', value: 'Auditor' },
    { key: '2', value: 'Sr.Auditor Manager' },


  ]
  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1, }}>
      <View style={{ marginHorizontal: '7%', }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 25, }}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('myprofile')}>
              <Image
                source={require('../../images/back.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={{ marginBottom: 20, }}>
            <View>
              <Text
                style={{
                  fontFamily: 'BarlowCondensed-Bold',
                  fontWeight: 'bold',
                  fontSize: 24,
                  color: '#23233C',
                }}>
                EDIT PROFILE
              </Text>
              <Text
                style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#3C3D3E' }}>
                Update your profile
              </Text>
            </View>

          </View>

          <View style={{ marginTop: 10, marginHorizontal: '2%' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <Text>Employee name</Text>
              <Text style={{ fontSize: 10, color: '#D74B29' }}>Required</Text>
            </View>
            <TextInput style={{ height: 50, marginVertical: 12, color: '#101820', fontSize: 14, borderRadius: 5, borderWidth: 1, borderColor: '#70707034', padding: 10 }} defaultValue={'Deepak Singh'} />
          </View>

          <View style={{ marginTop: 10, }}>
            <Text>Employee Role</Text>
            <SelectList
              data={options}
              setSelected={(val) => setSelected(val)}
              save="value"
              boxStyles={{ backgroundColor: '#F2F2F2', borderColor: '#70707034', marginVertical: 10, height: 50, }}
              inputStyles={{ borderColor: '#fff', }}
              dropdownStyles={{ justifyContent: 'center', backgroundColor: '#70707034', borderColor: '#fff', }}
              dropdownItemStyles={{ justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: '600', borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginVertical: 2, }} />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: '2%' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <Text>Email address</Text>
              <Text style={{ fontSize: 10, color: '#D74B29' }}>Verification Required</Text>
            </View>
            <TextInput style={{ height: 50, marginVertical: 12, color: '#101820', fontSize: 14, borderRadius: 5, borderWidth: 1, borderColor: '#70707034', padding: 10 }} defaultValue={'deepak.singh@example.com'} />
          </View>
          <View style={{ marginTop: 10, marginHorizontal: '2%' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <Text>Phone number</Text>
              <Text style={{ fontSize: 10, color: '#D74B29' }}>Verification Required</Text>
            </View>
            <TextInput keyboardType='number-pad' style={{ height: 50, marginVertical: 12, color: '#101820', fontSize: 14, borderRadius: 5, borderWidth: 1, borderColor: '#70707034', padding: 10 }} defaultValue={'9876543210'} maxLength={10} />
          </View>

          <TouchableHighlight style={{ backgroundColor: '#00A2B8', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, marginVertical: 30, borderRadius: 10, }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }} onPress={() => navigation.navigate('myprofile')}>UPDATE</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )
}