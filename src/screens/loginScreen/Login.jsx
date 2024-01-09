import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Color from '../../constants/Color';
import * as WebBrowser from 'expo-web-browser';
import {useWarmUpBrowser} from '../../hooks/warmUpBrowser';
import {useCallback} from 'react';
import {useAuth, useOAuth, useUser} from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'});
  const {isLoaded, isSignedIn, user} = useUser();

  const onPress = useCallback(async () => {
    try {
      const {createdSessionId, signIn, signUp, setActive, authSessionResult} =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({session: createdSessionId});
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);
  return (
    <View style={{alignItems: 'center'}}>
      <Image style={styles.loginImage} source={require('../../../assets/images/medall_mockup.png')}/>
      <View style={styles.subContainer}>
        <Text style={{fontSize: 27, color: Color.WHITE, textAlign: 'center'}}>Let's Find <Text
          style={{fontWeight: 'bold'}}>Professional
          cleaning and repair</Text> service</Text>
        <Text style={{fontSize: 17, color: Color.WHITE, textAlign: 'center', marginTop: 20}}>Best app to find services
          near you which
          deliver you a professional service</Text>
        <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={{textAlign: 'center', fontSize: 17, color: Color.PRIMARY}}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    width: 300,
    height: 450,
    marginTop: 70,
    borderColor: Color.BLACK
  },
  subContainer: {
    width: '100%',
    backgroundColor: Color.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20
  },
  button: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 40,
  }
})