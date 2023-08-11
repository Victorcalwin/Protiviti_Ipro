import { View, Text, Image, TouchableHighlight, TextInput, TouchableOpacity, Button, ScrollView, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default function MyAuditFilter({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selected, setSelected] = useState('')
  const [defaultValue, setDefaultValue] = useState('In Progress')
  const [fromDates,setfromDate]=useState('')
  const [finalDate,setfinalDate]=useState('')

  
  const options = [
    { key: '1', value: 'InProgress' },
    { key: '2', value: 'Completed' },
    { key: '3', value: 'Closed' },
    { key: '4', value: 'Sent to PMO' },
  ]

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const fromdata = (date) => {
    console.log(date.toString());
    setfromDate(date.toString())
    hideDatePicker();
  };

  const toDate = (date) => {
    setfinalDate(date.toString())
    hideDatePicker();
  };

  const first = new Date(fromDates).toLocaleDateString('en-GB').split('/')
  const second = new Date(finalDate).toLocaleDateString('en-GB').split('/')
  const filter = {
    from:first[2] + "/" + first[1] + "/" + first[0],
    to:second[2] + "/" + second[1] + "/" + second[0],
    status:selected
  }

  
  const submit=()=>{
        navigation.navigate('myauditfilterdata',{filterdata:filter})
  }

  
  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF', flex: 1, }}>
      <View style={{ marginHorizontal: '5%', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 25, }}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('myaudit')}>
            <Image
              source={require('../../images/back.png')}
            />
          </TouchableNativeFeedback>
        </View>
        <View style={{marginHorizontal:'3%'}}>
        <View style={{ marginBottom: 15, }}>
          <View>
            <Text
              style={{
                fontFamily: 'BarlowCondensed-Bold',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#23233C',
              }}>
              FILTER
            </Text>
            <Text
              style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: '#3C3D3E' }}>
              My Audits
            </Text>
          </View>

        </View>

        <View style={{ marginTop: 10, }}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, }}>From Date</Text>
          <TouchableOpacity style={{ position: 'relative' }}>
            <Text style={{ height: 50, marginVertical: 12, color: '#101820', fontSize: 14, marginHorizontal: 5, borderRadius: 5, borderWidth: 1, borderColor: '#70707034', paddingVertical: 14, paddingHorizontal: 25, }} onPress={showDatePicker}>Select a Date</Text>
            <Image
              source={require('../../images/calender.png')}
              style={{ position: 'absolute', right: 30, top: 30, }}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={fromdata}
            onCancel={hideDatePicker}
          />
          {fromDates ? <Text>{new Date(fromDates).toLocaleDateString('en-GB')}</Text> : null}
        </View>
        <View style={{ marginTop: 10, }}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, }}>To Date</Text>
          <TouchableOpacity style={{ position: 'relative' }}>
            <Text style={{ height: 50, marginVertical: 12, color: '#101820', fontSize: 14, marginHorizontal: 5, borderRadius: 5, borderWidth: 1, borderColor: '#70707034', paddingVertical: 14, paddingHorizontal: 25, }} onPress={showDatePicker}>Select a Date</Text>
            <Image
              source={require('../../images/calender.png')}
              style={{ position: 'absolute', right: 30, top: 30, }}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={toDate}
            onCancel={hideDatePicker}
          />
          {finalDate ? <Text>{new Date(finalDate).toLocaleDateString('en-GB')}</Text> : null}
        </View>
        <View style={{ marginTop: 10, }}>
          <Text>Audit Status</Text>
          <SelectList
            data={options}
            setSelected={(val) => setSelected(val)}
            save="value"
            defaultValue={defaultValue}
            boxStyles={{ backgroundColor: '#F2F2F2', borderColor: '#70707034', marginVertical: 10, height: 50, }}
            inputStyles={{ borderColor: '#fff', }}
            dropdownStyles={{ justifyContent: 'center', backgroundColor: '#70707034', borderColor: '#fff', }}
            dropdownItemStyles={{ justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: '600', borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginVertical: 2, }} />
        </View>
        <View style={{ width: '100%', marginTop: 80, }}>
          <TouchableHighlight style={{ backgroundColor: '#00A2B8', width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 65, marginTop: 50, borderRadius: 10, alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }} onPress={submit}>APPLY FILTERS</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{ backgroundColor: '#fff', width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 50, marginVertical: 20, borderRadius: 10, borderWidth: 1, borderColor: '#D74B29' }}>
            <Text style={{ textAlign: 'center', color: '#D74B29', fontWeight: 'bold' }}>CLEAR ALL FILTERS</Text>
          </TouchableHighlight>
        </View>
      </View>
      </View>
    </ScrollView>

  )
}