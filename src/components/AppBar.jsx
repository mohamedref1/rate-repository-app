import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Pressable, ScrollView, I18nManager } from 'react-native';

import useAuthStorage from '../hooks/useAuthStorage'
import { ME } from '../graphql/queries';
import theme from '../theme';
import pages from '../pages'

const styles = StyleSheet.create({
  container: {
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
  },
  direction: {
    display: 'flex',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  }
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigation = useNavigation();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigation.navigate(pages.signIn.name);
  }

  const RepositoriesTab = () => (
    <View style={styles.tab}>
      <Pressable onPress={() => navigation.navigate(pages.repositories.name)}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={[styles.container, styles.direction]}>
      <ScrollView horizontal>
        {data?.me
          ? (
            <View style={styles.direction}>
              <RepositoriesTab />

              <View style={styles.tab}>
                <Pressable onPress={() => navigation.navigate(pages.review.name)}>
                  <Text style={styles.text}>Create a review</Text>
                </Pressable>
              </View>
              <View style={styles.tab}>
                <Pressable onPress={() => navigation.navigate(pages.myReviews.name)}>
                  <Text style={styles.text}>My reviews</Text>
                </Pressable>
              </View>
              <View style={styles.tab}>
                <Pressable onPress={signOut}>
                  <Text style={styles.text}>Sign out</Text>
                </Pressable>
              </View>
            </View>
          )
          : (
            <View style={styles.direction}>
              <RepositoriesTab />

              <View style={styles.tab}>
                <Pressable onPress={() => navigation.navigate(pages.signIn.name)}>
                  <Text style={styles.text}>Sign in</Text>
                </Pressable>
              </View>
              <View style={styles.tab}>
                <Pressable onPress={() => navigation.navigate(pages.signUp.name)}>
                  <Text style={styles.text}>Sign up</Text>
                </Pressable>
              </View> 
            </View>
          )}
      </ScrollView>
    </View>
  )
};

export default AppBar;
