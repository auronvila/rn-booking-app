import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../screens/businessListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDeatilScreen from '../screens/businessDetailScreen/BusinessDeatilScreen';

const Stack = createStackNavigator()
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'home'} component={HomeScreen}/>
      <Stack.Screen name={'businessList'} component={BusinessListByCategoryScreen}/>
      <Stack.Screen name={'businessDetail'} component={BusinessDeatilScreen}/>
    </Stack.Navigator>
  )
}