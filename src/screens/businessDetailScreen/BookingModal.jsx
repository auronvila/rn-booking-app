import {
  Alert,
  FlatList,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Color from '../../constants/Color';
import CalendarPicker from 'react-native-calendar-picker';
import Heading from '../../components/Heading';
import {useEffect, useState} from 'react';
import GlobalApi from '../../constants/GlobalApi';
import {useUser} from '@clerk/clerk-expo';
import moment from 'moment';

export default function BookingModal({onClose, businessId}) {
  const [timeList, setTimeList] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [note, setNote] = useState()
  const {user} = useUser()

  useEffect(() => {
    getTime()
  }, []);

  function getTime() {
    const timeList = []
    for (let i = 8; i < 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }

    for (let i = 1; i < 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }
    setTimeList(timeList)
  }

  async function createBooking() {
    if (!selectedTime || !selectedDate) {
      return Alert.alert('Please fill all the fields')
    }
    const data = {
      userName: user.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: moment(selectedDate).format('DD-MMM-YYYY') ,
      businessId: businessId
    }
    const res = await GlobalApi.createBooking(data)
    onClose()
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}>
      <ScrollView keyboardShouldPersistTaps="always" style={{margin: 20}}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.backButtonContainer}
        >
          <AntDesign name="arrowleft" size={24} color={Color.BLACK}/>
        </TouchableOpacity>
        <Heading text={'Select Date'}/>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            minDate={Date.now()}
            todayBackgroundColor={Color.PRIMARY}
            todayTextStyle={{color: Color.WHITE}}
            selectedDayColor={Color.BLACK}
            selectedDayTextColor={Color.WHITE}
            width={350}
            onDateChange={setSelectedDate}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Heading text={'Select Time Slot'}/>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={timeList} renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setSelectedTime(item.time)}
              style={[selectedTime === item.time ? styles.selectedTime : styles.unselectedTime]}>
              <Text
                style={[selectedTime === item.time ? {color: Color.WHITE} : {color: Color.BLACK}]}>{item.time}</Text>
            </TouchableOpacity>
          )}/>
        </View>

        <View style={{marginTop: 10}}>
          <Heading text={'Any Suggestion Note'}/>
        </View>
        <TextInput
          onChangeText={(text) => setNote(text)}
          multiline style={styles.noteTextArea}
          placeholder={'None'}
          numberOfLines={5}/>
        <TouchableOpacity onPress={createBooking} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>
            Confirm & Book
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  backButtonContainer: {
    zIndex: 10,
    marginVertical: 15,
    marginTop: 30
  },
  calendarContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    borderRadius: 15,
    padding: 20
  },
  selectedTime: {
    padding: 8,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderRadius: 99,
    color: Color.WHITE,
    borderColor: Color.PRIMARY
  },
  unselectedTime: {
    padding: 8,
    marginHorizontal: 3,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 99,
    color: Color.PRIMARY,
    borderColor: Color.PRIMARY
  },
  noteTextArea: {
    height: 100,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 15,
    textAlignVertical: 'top',
    padding: 20,
    fontSize: 16,
    fontFamily: 'outfit'
  },
  confirmButton: {
    textAlign: 'center',
    backgroundColor: Color.PRIMARY,
    borderRadius: 15,
    padding: 10,
    marginTop: 15
  },
  confirmButtonText: {
    alignSelf: 'center',
    color: Color.WHITE,

  }

})