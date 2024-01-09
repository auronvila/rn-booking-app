import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import BookingScreen from '../screens/bookingScreen/BookingScreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import {Text} from 'react-native';
import {AntDesign, Entypo,FontAwesome} from '@expo/vector-icons';
import Color from '../constants/Color';
import HomeNavigation from './HomeNavigation';
export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false,tabBarActiveTintColor:Color.PRIMARY}}>
      <Tab.Screen
        options={{
          tabBarLabel: ({color, focused}) => (<Text style={{color: color, fontSize: 12, marginTop: -7}}>Home</Text>),
          tabBarIcon: ({focused, color, size}) => {
           return  focused ? (
              <Entypo name="home" size={24} color={color}/>
            ) : (
              <AntDesign name="home" size={24} color={color}/>
            )
          }
        }}
        name={'home'} component={HomeNavigation}/>
      <Tab.Screen
        options={{
          tabBarLabel: ({color, focused}) => (<Text style={{color: color, fontSize: 12, marginTop: -7}}>Booking</Text>),
          tabBarIcon: ({focused, color, size}) => {
            return  focused ? (
              <FontAwesome name="bookmark" size={24} color={color}/>
            ) : (
              <FontAwesome name="bookmark-o" size={24} color={color}/>
            )
          }
        }}
        name={'booking'} component={BookingScreen}/>
      <Tab.Screen
        options={{
          tabBarLabel: ({color, focused}) => (<Text style={{color: color, fontSize: 12, marginTop: -7}}>Profile</Text>),
          tabBarIcon: ({focused, color, size}) => {
            return  focused ? (
              <FontAwesome name="user" size={24} color={color}/>
            ) : (
              <FontAwesome name="user-o" size={24} color={color}/>
            )
          }
        }}
        name={'profile'} component={ProfileScreen}/>
    </Tab.Navigator>
  )
}