import {StyleSheet, Text, View} from 'react-native';

export default function Heading({text, isViewAll = false,onViewAllClick}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.heading}>{text}</Text>
      </View>
      {isViewAll && <Text onPress={onViewAllClick}>View All</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    marginBottom: 10,
  },
})