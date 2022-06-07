import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { format } from "date-fns/esm";
import { Alert, I18nManager, StyleSheet, Text, View, Button } from "react-native"

import { DELETE_REVIEW } from '../graphql/mutations'
import { ME } from '../graphql/queries'
import theme from '../theme';
import pages from '../pages'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    padding: 20,
    backgroundColor: theme.bgColors.white
  },
  left: {
    marginRight: I18nManager.isRTL ? 0 : 20,
    marginLeft: I18nManager.isRTL ? 20 : 0,
    marginTop: 5,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingText: {
    fontSize: theme.fontSize.subheading ,
    fontWeight: theme.fontWeighs.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    paddingTop: 12
  },
  right: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  name: {
    fontSize: theme.fontSize.subheading,
    fontWeight: theme.fontWeighs.bold
  },
  createdAt: {
    width: '100%',
    color: theme.colors.secondary,
    marginBottom: 8
  },
  buttonView: {
    width: '47.5%',
    paddingBottom: 5,
    backgroundColor: '#FFF',
  }
})

const ReviewItem = ({review, hasActions}) => {
  const navigation = useNavigation()
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [ME]
  })
  
  return (
    <View>
      <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.ratingText}>{review.item.rating}</Text>
      </View>
      <View style={styles.right}>
        {review.item.repository
         ? (
          <Text style={styles.name}>{review.item.repository.fullName}</Text>
         )
         : (
          <Text style={styles.name}>{review.item.user.username}</Text>
         )}
        <Text style={styles.createdAt}>{format(new Date(review.item.createdAt), 'ccc mm/dd/yyyy hh:mm')}</Text>
        <Text>{review.item.text}</Text>
      </View>
    </View>
    {hasActions
        ? (
          <View style={[styles.container, {'justifyContent': 'space-between'}]}>
            <View style={styles.buttonView}>
              <Button 
                title="View repository" 
                onPress={() => navigation.navigate(pages.repository.name, {itemId: review.item.repository.id})}
              />
            </View>
            <View style={styles.buttonView}>
              <Button 
                title="Delete repository" 
                color='red'
                onPress={() => {
                  Alert.alert(
                    "Delete review",
                    "Are you sure you want to delete this review",
                    [
                      {
                        text: "CANCEL",
                      },
                      {
                        text: "DELETE",
                        onPress: async () => {
                          await deleteReview({variables: { deleteReviewId: review.item.id}})
                        },
                      },
                    ]
                  );
                }}
              />
            </View>
          </View>
        )
        : (
          null
        )
      }
    </View>    
  )
}

export default ReviewItem;