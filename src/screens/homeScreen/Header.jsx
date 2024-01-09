import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useUser} from '@clerk/clerk-expo';
import Color from '../../constants/Color';
import {FontAwesome, Ionicons} from '@expo/vector-icons';

export default function Header() {
  const {isLoaded, isSignedIn, user} = useUser();

  return user && (
    <View style={styles.container}>
      {/*Profile Section*/}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.userImage} source={{uri: user?.imageUrl}}/>
          <View>
            <Text style={{color: Color.WHITE, fontFamily: 'outfit'}}>Welcome,</Text>
            <Text style={{color: Color.WHITE, fontSize: 20, fontFamily: 'outfit-medium'}}>{user?.fullName}</Text>
          </View>
        </View>
        <Ionicons name="bookmarks-outline" size={30} color={Color.WHITE}/>
      </View>
      {/*SearchBar Section*/}
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.textInput} placeholder={'search'}/>
        <View style={styles.searchIcon}>
          <FontAwesome name="search" size={24} color={Color.PRIMARY}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchIcon: {
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    padding: 10,
  },
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    width: '85%'
  },
  searchBarContainer: {
    gap: 12,
    marginTop: 25,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
})