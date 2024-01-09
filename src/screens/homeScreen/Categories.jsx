import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GlobalApi from '../../constants/GlobalApi';
import {useEffect, useState} from 'react';
import Heading from '../../components/Heading';
import Color from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';

export default function Categories() {
  const [categories, setCategories] = useState()
  const navigation = useNavigation()
  const [categoryIndex, setCategoryIndex] = useState(2)
  useEffect(() => {
    getCategories()
  }, []);
  const getCategories = async () => {
    try {
      const res = await GlobalApi.getCategories();
      setCategories(res.categories)
    } catch (e) {
      console.log(e)
    }
  }

  function handleOnViewAllClick() {
    setCategoryIndex(4)
  }

  return (
    <View style={{marginTop: 10}}>
      <Heading onViewAllClick={handleOnViewAllClick} isViewAll text={'Categories'}/>
      <FlatList bounces={false} numColumns={4} data={categories}
                renderItem={({item, index}) => index <= categoryIndex && (
                  <TouchableOpacity
                    onPress={() => navigation.push('businessList', {category: item.name})}
                    style={styles.container}
                  >
                    <View style={styles.iconsContainer}>
                      <Image style={{width: 40, height: 40}} source={{uri: item.icon.url}}/>
                    </View>
                    <Text style={{fontFamily: 'outfit-medium', marginTop: 5}}>{item.name}</Text>
                  </TouchableOpacity>
                )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconsContainer: {
    padding: 13,
    borderRadius: 99,
    backgroundColor: Color.LIGHTGRAY
  }
})