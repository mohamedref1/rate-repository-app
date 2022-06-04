import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.bgColors.primary
  }
})

const Stack = createNativeStackNavigator();

const Page = ({children, navigation}) => {
  return (
    <View style={styles.container}>
      <AppBar navigation={navigation}/>
      {children}
    </View>
  )
}

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Repositories" >
        {({navigation}) => (
          <Page navigation={navigation}>
            <RepositoryList />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignIn" >
        {({navigation}) => (
          <Page navigation={navigation}>
            <SignIn />
          </Page>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Main;