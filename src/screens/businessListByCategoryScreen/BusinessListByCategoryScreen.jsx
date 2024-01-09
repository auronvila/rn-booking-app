import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import GlobalApi from '../../constants/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Color from '../../constants/Color';

export default function BusinessListByCategoryScreen() {
  const [businessList, setBusinessList] = useState([])
  const route = useRoute().params
  const navigation = useNavigation()
  useEffect(() => {
    route && getBusinessByCategory()
  }, [route]);
  const getBusinessByCategory = async () => {
    try {
      const res = await GlobalApi.getBusnissesListByCategory(route.category);
      setBusinessList(res.businessLists)
      console.log(res)
    } catch (e) {
      console.log('errr----', e)
    }
  }

  return (
    <View style={{padding: 20, paddingTop: 60,}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}
      >
        <AntDesign name="arrowleft" size={24} color="black"/>
        <Text style={{fontSize: 25, fontFamily: 'outfit-medium'}}>{route?.category}</Text>
      </TouchableOpacity>
      {businessList.length > 0 ?
        <FlatList style={{height: '100%'}} data={businessList}
                  renderItem={({index, item}) => <BusinessListItem businessItem={item}/>}/> : <Text
          style={{fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: 30, color: Color.GRAY}}>No
          Business Found</Text>}
    </View>
  )
}