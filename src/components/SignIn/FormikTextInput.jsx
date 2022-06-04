import { useField } from "formik";
import { StyleSheet, Text, TextInput } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  error: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.heading,
    marginTop: 12,
    marginRight: 6,

  }
});

const FormikTextInput = ({name, ...props}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  if (showError) {
    props.style = {...props.style, borderColor: theme.colors.danger}
  }

  return (
    <>
      <TextInput 
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.error}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput;