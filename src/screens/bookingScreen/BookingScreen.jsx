import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Heading from '../../components/Heading';
import GlobalApi from '../../constants/GlobalApi';
import {useUser} from '@clerk/clerk-expo';
import {useEffect, useState} from 'react';
import BookingScreenItem from './BookingScreenItem';

export default function BookingScreen() {
  const [bookingList, setBookingList] = useState()
  const [loading, setLoading] = useState(false)
  const {user} = useUser()

  useEffect(() => {
    getUserBooking()
  }, [user]);

  async function getUserBooking() {
    setLoading(true)
    const response = await GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress);
    setBookingList(response.bookings)
    setLoading(false)
  }

  return (
    <View style={{padding: 30, paddingTop: 50}}>
      <Heading text={'My Bookings'}/>
      <View>
        <FlatList
          onRefresh={getUserBooking}
          refreshing={loading}
          style={{height: '100%'}}
          data={bookingList}
          renderItem={({item, index}) => (<BookingScreenItem bookingItem={item}/>)}/>
      </View>
    </View>
  )
}
