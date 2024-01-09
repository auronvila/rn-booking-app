import {FlatList, Image, Text} from 'react-native';
import Heading from '../../components/Heading';

export default function BusinessPhotos({business}) {
  return (
    <>
      <Heading text={'Photos'}/>
      <FlatList numColumns={2} data={business.images} renderItem={({item}) => (
        <Image style={{
          width: '60%',
          alignSelf: 'center',
          borderRadius: 15,
          margin: 5,
          height: 120
        }} source={{uri: item.url}}
        />
      )}/>
    </>
  )
}