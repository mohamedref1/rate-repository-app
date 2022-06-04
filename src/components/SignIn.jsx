import { Formik } from "formik";
import * as yup from 'yup'
import { Pressable, StyleSheet, Text, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

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
  }
})

const SignIn = () => {
  const initialValues = {
    username: '',
    password: ''
  }

  const onSubmit = (values) => {
    console.log(values)
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
                placeholder='password'
                style={styles.field}
                secureTextEntry
              />
            </View>
            <Pressable 
              onPress={handleSubmit}
              style={[styles.field, styles.pressable]}
            >
              <Text style={styles.pressableText}>Sing In</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
    );
};

export default SignIn;
