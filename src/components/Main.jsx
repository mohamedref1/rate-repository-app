import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import theme from '../theme';
import pages from '../pages';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList'
import Repository from './Repository';
import MyReviews from './MyReviews';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ReviewForm from './ReviewForm';



const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.bgColors.primary
  }
})

const Stack = createNativeStackNavigator();

const Page = ({children}) => {
  return (
    <View style={styles.container}>
      <AppBar/>
      {children}
    </View>
  )
}

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={pages.repositories.name}
    >
      <Stack.Screen name={pages.signIn.name} >
        {() => (
          <Page>
            <SignInForm />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name={pages.signUp.name} >
        {() => (
          <Page>
            <SignUpForm />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name={pages.repositories.name} >
        {() => (
          <Page>
            <RepositoryList />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name={pages.repository.name} >
        {({route}) => (
          <Page>
            <Repository route={route} />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name={pages.review.name} >
        {() => (
          <Page>
            <ReviewForm />
          </Page>
        )}
      </Stack.Screen>
      <Stack.Screen name={pages.myReviews.name} >
        {() => (
          <Page>
            <MyReviews />
          </Page>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Main;