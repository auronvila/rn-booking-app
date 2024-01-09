import {Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Color from '../../constants/Color';
import Heading from '../../components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';
import {useAuth, useUser} from '@clerk/clerk-expo';

export default function BusinessDeatilScreen() {
  const route = useRoute().params;
  const [business, setBusiness] = useState(route.business)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const {user} = useUser()

  async function onMessageButtonClick() {
    const email = user?.primaryEmailAddress.emailAddress;
    const subject = encodeURIComponent('I am looking for your Service');
    const body = encodeURIComponent('Hi There,');

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(mailtoLink);
    } catch (error) {
      console.error('Error opening mailto link', error);
    }
  }


  return (
    <View>
      <ScrollView style={{height: '92%'}}>
        <Image style={{width: '100%', height: 300}} source={{uri: business?.images[0]?.url}}/>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <AntDesign name="arrowleft" size={24} color={Color.WHITE}/>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={{fontFamily: 'outfit-bold', fontSize: 25,}}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                color: Color.PRIMARY,
                fontSize: 20,
              }}>{business?.contactPerson}</Text>
            <View style={{backgroundColor: Color.PRIMARY_LIGHT, fontSize: 17, paddingHorizontal: 10, borderRadius: 20}}>
              <Text style={{
                color: Color.PRIMARY,
                padding: 3
              }}>{business?.category.name}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 7}}>
            <Ionicons name="location-outline" size={20} color={Color.PRIMARY}/>
            <Text style={{fontSize: 17, fontFamily: 'outfit', color: Color.GRAY}}>{business?.address}</Text>
          </View>
          <View style={{borderBottomWidth: 0.5, borderColor: Color.GRAY, marginTop: 15, marginBottom: 15}}></View>
          <View>
            <Heading text={'About Me'}/>
            <Text numberOfLines={5}
                  style={{
                    fontFamily: 'outfit',
                    color: Color.GRAY,
                    fontSize: 16,
                    lineHeight: 28
                  }}>{business.about}</Text>
          </View>
          <View style={{borderBottomWidth: 0.7, borderColor: Color.GRAY, marginTop: 15, marginBottom: 15}}></View>
          <BusinessPhotos business={business}/>
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity onPress={onMessageButtonClick} style={styles.messageButton}>
          <Text style={{alignSelf: 'center', color: Color.PRIMARY, fontSize: 16}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.bookingButton}>
          <Text style={{alignSelf: 'center', color: Color.WHITE, fontSize: 16}}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType={'slide'} visible={showModal}>
        <BookingModal businessId={business.id} onClose={() => setShowModal(false)}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
    paddingTop: 50,
  },
  infoContainer: {
    padding: 20,
    gap: 7,
  },
  subContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  messageButton: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    marginLeft: 6,
    flex: 1,
    textAlign: 'center'
  },
  bookingButton: {
    padding: 15,
    marginRight: 6,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    flex: 1,
    borderColor: Color.WHITE,
    borderRadius: 99,
    textAlign: 'center'
  }
})