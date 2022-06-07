import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup'
import { Pressable, StyleSheet, Text, View } from "react-native";

import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import pages from '../pages';

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

export const SignInFormContainer = ({ onSubmit, submitError }) => {
  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
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
                name='username' 
                placeholder='Username'
                style={styles.field}
              />
            </View>
            <View style={styles.fieldContainer}>
              <FormikTextInput 
                name='password' 
                placeholder='Password'
                style={styles.field}
                secureTextEntry
              />
            </View>
            <Pressable 
              onPress={handleSubmit}
              style={[styles.field, styles.pressable]}
            >
              <Text style={styles.pressableText}>Sign In</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

const SignInForm = () => {
  const [submitError, setSubmitError] = useState(null);
  const [signIn] = useSignIn();
  const navigation = useNavigation()

  const onSubmit = async (values) => {
    const {username, password} = values;

    try {
      await signIn({ username, password })
      navigation.navigate(pages.repositories.name)
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  
  return (
    <SignInFormContainer 
      onSubmit={onSubmit} 
      submitError={submitError} 
    />
  )
};

export default SignInForm;
