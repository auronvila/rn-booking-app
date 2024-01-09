import {Image, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import Color from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';

export default function BusinessListItem({businessItem}) {
const navigation = useNavigation()
  function handleRoute(){
  navigation.navigate('businessDetail',{business:businessItem})
  }

  return (
    <TouchableOpacity onPress={handleRoute} style={styles.container}>
      <Image style={styles.image} source={{uri: businessItem?.images[0]?.url}}/>
      <View style={styles.infoContainer}>
        <Text style={{
          fontSize: 17,
          fontFamily: 'outfit-medium'
        }}>{businessItem?.name}</Text>
        <Text style={{fontSize: 13, fontFamily: 'outfit', color: Color.GRAY}}>{businessItem?.contactPerson}</Text>
        <Text style={{
          fontSize: 10,
          fontFamily: 'outfit',
          padding: 3,
          backgroundColor: Color.PRIMARY_LIGHT,
          borderRadius: 8,
          alignSelf: 'flex-start',
          paddingHorizontal: 8,
          color: Color.PRIMARY
        }}>{businessItem?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 100,
    borderRadius: 10
  },
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
  },
  infoContainer: {
    gap: 3,
    padding: 7,
    display: 'flex',

  }
})