import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  formParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    /* backgroundColor: 'green', */
    padding: 15
  },
  formEntry: {
    width: '100%'
  },
  formEntryButton: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    fontWeight: '600',
    color: theme.colors.appBarText,
    borderRadius: 5,
  },
  formEntryButtonView: { 
    width: '100%', 
    borderRadius: 7, 
    overflow: 'hidden', 
    backgroundColor: 'yellow', 
    marginTop: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formParent}>
      <FormikTextInput style={styles.formEntry} name="username" placeholder="Username" testID='usernameField' />
      <FormikTextInput style={styles.formEntry} name="password" placeholder="Password" secureTextEntry testID='passwordField' />
      <View style={styles.formEntryButtonView}>
        <Pressable onPress={onSubmit} testID='submitButton'>
          <Text style={styles.formEntryButton}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignIn = ({ onSubmit }) => {

  return (
    <Formik initialValues={{ username:"", password:"" }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInContainer = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <SignIn onSubmit={onSubmit} />
  );
};

export default SignInContainer;