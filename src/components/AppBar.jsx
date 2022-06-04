import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight / 2,
    backgroundColor: theme.bgColors.header
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.heading
  },
  tab: {
    marginRight: 20
  }
});

const AppBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tab}>
          <Pressable onPress={() => navigation.navigate('Repositories')}>
            <Text style={styles.text}>Repositories</Text>
          </Pressable>
        </View>
        <View style={styles.tab}>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
};

export default AppBar;
