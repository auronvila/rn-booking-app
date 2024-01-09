import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../constants/Color';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function BusinessListItem({businessItem}) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.push('businessDetail', {business: businessItem})}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: businessItem?.images[0]?.url}}/>
        <View style={styles.subContainer}>
          <Text style={{fontFamily: 'outfit', color: Color.GRAY, fontSize: 15,}}>{businessItem.contactPerson}</Text>
          <Text style={{fontFamily: 'outfit-bold', fontSize: 19}}>{businessItem.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="location-outline" size={20} color={Color.PRIMARY}/>
            <Text
              style={{
                fontFamily: 'outfit',
                color: Color.GRAY,
                fontSize: 16,
                marginLeft: 5
              }}>{businessItem.address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: Color.WHITE,
    flexDirection: 'row',
    gap: 20,
  },
  subContainer: {
    gap: 8
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15
  }
})