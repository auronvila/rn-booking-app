import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import GlobalApi from '../../constants/GlobalApi';
import {useEffect, useState} from 'react';
import Heading from '../../components/Heading';

export default function Slider() {
  const [slider, setSlider] = useState()
  useEffect(() => {
    const getSliders = async () => {
      const response = await GlobalApi.getSlider()
      setSlider(response?.sliders)
    }
    getSliders()
  }, []);

  return (
    <View>
      <Heading text={'Offers For You'}/>
      <FlatList showsHorizontalScrollIndicator={false} horizontal data={slider} renderItem={(item, index) => (
        <View style={{marginRight: 20}}>
          <Image style={styles.sliderImage} source={{uri: item?.item?.image?.url}}/>
        </View>
      )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  sliderImage: {
    width: 320,
    height: 150,
    objectFit: 'contain',
    borderRadius: 99
  }
})