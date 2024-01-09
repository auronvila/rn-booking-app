import {FlatList, Image, Text, View} from 'react-native';
import Heading from '../../components/Heading';
import GlobalApi, {getBusnissesList} from '../../constants/GlobalApi';
import {useEffect, useState} from 'react';
import BusinessListItem from './BusinessListItem';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState()
  useEffect(() => {
    getBusinessess()
  }, []);

  async function getBusinessess() {
    const res = await getBusnissesList()
    setBusinesses(res.businessLists)
  }

  return (
    <>
      <View style={{marginTop: 10}}>
        <Heading text={'Latest Business'} isViewAll={true}/>
        <FlatList horizontal showsHorizontalScrollIndicator={false} data={businesses} renderItem={({item, index}) =>
          <View style={{marginRight:10}}>
            <BusinessListItem businessItem={item}/>
          </View>
        }/>
      </View>
    </>
  )
}