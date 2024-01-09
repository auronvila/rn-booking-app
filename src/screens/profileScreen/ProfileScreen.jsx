import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Heading from '../../components/Heading';
import Color from '../../constants/Color';
import {useAuth, useUser} from '@clerk/clerk-expo';
import {Entypo, FontAwesome} from '@expo/vector-icons';

export default function ProfileScreen() {
  const {user} = useUser()
  const {isLoaded, signOut} = useAuth();

  async function onMessageButtonClick() {
    const email = user?.primaryEmailAddress.emailAddress;
    const subject = encodeURIComponent('I am looking for your Service');
    const body = encodeURIComponent('Hi There,');

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(mailtoLink);
    } catch (error) {
      console.error('Error opening mailto link', error);
    }
  }


  return (
    <View>
      <View style={styles.colorContainer}>
        <View style={{paddingTop: 65, paddingLeft: 40}}>
        </View>
        <Image style={styles.userImage} source={{uri: user?.imageUrl}}/>
        <Text style={styles.fullNameText}>{user?.fullName}</Text>
        <Text style={styles.emailAddressText}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
      <TouchableOpacity onPress={onMessageButtonClick}>
        <View style={styles.logOutContainer}>
          <FontAwesome name="envelope-o" size={24} color={Color.PRIMARY}/>
          <Text style={{fontFamily: 'outfit-medium', marginLeft: 10}}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <View style={styles.logOutContainer}>
          <Entypo name="log-out" size={24} color={Color.PRIMARY}/>
          <Text style={{fontFamily: 'outfit-medium', marginLeft: 10}}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  colorContainer: {
    backgroundColor: Color.PRIMARY,
    width: '100%',
  },
  userImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  fullNameText: {
    alignSelf: 'center',
    marginTop: 10,
    color: Color.WHITE,
    fontSize: 20,
    fontFamily: 'outfit-bold'
  },
  emailAddressText: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: Color.LIGHTGRAY,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logOutContainer: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: Color.PRIMARY_LIGHT,
    width: '90%'
  }
})