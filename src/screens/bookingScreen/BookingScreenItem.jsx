import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../constants/Color';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function BookingScreenItem({bookingItem}) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{uri: bookingItem?.businessList?.images[0]?.url}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{bookingItem?.businessList?.name}</Text>
        <Text style={styles.date}>{bookingItem?.date}</Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="location-outline" size={20} color={Color.PRIMARY}/>
          <Text style={styles.address}>{bookingItem.businessList?.address}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: 'outfit-medium'
  },
  container: {
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  address: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  date: {
    marginBottom: 45,
    fontFamily: 'outfit',
    fontSize: 16,
    color: Color.GRAY
  },
});
