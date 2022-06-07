import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import { Text, View, Image, StyleSheet, I18nManager, Pressable, Button } from "react-native";

import theme from "../theme";
import pages from "../pages"

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginBottom: 10,
    backgroundColor: theme.bgColors.white
  },
  header: {
    display: 'flex',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  },
  imageContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 20
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10
  },
  textContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1
  },
  name: {
    fontWeight: theme.fontWeighs.bold,
    fontSize: theme.fontSize.subheading,
    marginBottom: 10,
  },
  description: {
    width: '100%',
    fontSize: theme.fontSize.body,
    marginBottom: 10,
    color: theme.colors.secondary
  },
  language: {
    color: theme.colors.white,
    backgroundColor: theme.bgColors.secondary,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    width: 100,
    alignSelf: 'flex-end'
  },
  body: {
    display: 'flex',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  textCenter: {
    textAlign: 'center'
  },
  grayText: {
    color: theme.colors.secondary
  }
});

const RepositoryItem = ({item, isLink}) => {
  const navigation = useNavigation();

  const numberConverter = (string) => {
    let number = Number(string);
    if (number < 1000) {
      return String(number);
    }
    number = (number / 1000).toFixed(1);

    return number % 1 ? number + 'k' : parseInt(number) + 'k';
  }

  return (
    <View testID="repositoryItem" style={styles.container}>
      <Pressable onPress={() => {navigation.navigate(pages.repository.name, {itemId: item.id})}}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{
                uri: item.ownerAvatarUrl
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.language}>{item.language ? item.language : 'Unspecified'}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.textCenter}>{numberConverter(item.stargazersCount)}</Text>
            <Text style={styles.grayText}>Starts</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>{numberConverter(item.forksCount)}</Text>
            <Text style={styles.grayText}>Forks</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>{numberConverter(item.reviewCount)}</Text>
            <Text style={styles.grayText}>Reviews</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>{numberConverter(item.ratingAverage)}</Text>
            <Text style={styles.grayText}>Rating</Text>
          </View>
        </View>
        {isLink
          ? (
              <View>
                <Button 
                  title="Open In Github" 
                  onPress={() => {Linking.openURL(item.url)}}
                />
              </View>
            )
          : null}
      </Pressable>
    </View>
  )
}

export default RepositoryItem;