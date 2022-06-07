import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from 'yup'
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";

import { CREATE_REVIEW } from "../graphql/mutations";
import { GET_REPOSITORIES, ME } from "../graphql/queries";
import theme from "../theme";
import pages from '../pages'

import FormikTextInput from "./FormikTextInput";


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: theme.bgColors.white
  },
  fieldContainer: {
    marginBottom: 30,
  },
  field: {
    borderWidth: 1,
    borderColor: theme.bgColors.primary,
    padding: 20,
    fontSize: theme.fontSize.heading,
    borderRadius: 10
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    borderWidth: 0
  },
  pressableText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeighs.bold,
    textAlign: 'center'
  },
  submitErrorContainer: {
    margin: 6,
    marginBottom: 20
  },
  submitErrorText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.heading
  }
})

export const ReviewFormContainer = ({ onSubmit, submitError }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  }

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(0, 'Rating mustn\'t be less than 0')
      .max(100, 'Rating mustn\'t be larger than 100'),
    text: yup
      .string()
  })
  
  return (
    <View style={styles.container}>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({handleSubmit}) => (
          <View>
            {submitError 
              ? (
                <View style={styles.submitErrorContainer}>
                  <Text style={styles.submitErrorText}>{submitError}</Text>
                </View>
              )
              : null}
            <View style={styles.fieldContainer}>
              <FormikTextInput 
                name='ownerName' 
                placeholder='Repository owner name'
                style={styles.field}
              />
            </View>
            <View style={styles.fieldContainer}>
              <FormikTextInput 
                name='repositoryName' 
                placeholder='Repository Name'
                style={styles.field}
              />
            </View>
            <View style={styles.fieldContainer}>
              <FormikTextInput 
                name='rating' 
                placeholder='Rating between 0 and 100'
                style={styles.field}
              />
            </View>
            <View style={styles.fieldContainer}>
              <FormikTextInput 
                name='text' 
                placeholder='Review'
                style={styles.field}
                multiline
              />
            </View>
            <Pressable 
              onPress={handleSubmit}
              style={[styles.field, styles.pressable]}
            >
              <Text style={styles.pressableText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

const ReviewForm = () => {
  const [submitError, setSubmitError] = useState(null);
  const [crateReview] = useMutation(CREATE_REVIEW);
  const navigation = useNavigation()

  const onSubmit = async (values) => {
    const {
      ownerName,
      repositoryName,
      rating,
      text
    } = values;

    try {
      await crateReview({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating: parseInt(rating),
            text
          }
        },
        refetchQueries: [
          {
            query: GET_REPOSITORIES
          },
          {
            query: ME,
            variables: {
              includeReviews: true
            }
          }
        ]
      });

      navigation.navigate(pages.repository.name, {
        itemId: `${ownerName}.${repositoryName}`.toLowerCase()
      })
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  
  return (
    <ScrollView vertical>
      <ReviewFormContainer 
        onSubmit={onSubmit} 
        submitError={submitError} 
      />
    </ScrollView>
  )
};

export default ReviewForm;
