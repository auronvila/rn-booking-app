import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Login from './src/screens/loginScreen/Login';
import {ClerkProvider, SignedIn, SignedOut, useUser} from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigators/TabNavigation';
import {useFonts} from 'expo-font';
import {CLERK_KEY} from '@env';

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
  })
  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_KEY}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>
        <StatusBar style="auto"/>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
