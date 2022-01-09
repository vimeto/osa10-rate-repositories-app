import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";

import Text from './Text';
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
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
  username: yup
    .string()
    .required('Username is required')
    .test('len', 'Must be under 30 characters', val => val.length <= 30),
  password: yup
    .string()
    .required('Password is required')
    .test('len', 'Must be over 5 characters', val => val && val.length >= 5)
    .test('len', 'Must be under 50 characters', val => val && val.length <= 50),
  validatePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formParent}>
      <FormikTextInput style={styles.formEntry} name="username" placeholder="Username" />
      <FormikTextInput style={styles.formEntry} name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput style={styles.formEntry} name="validatePassword" placeholder="Validate password" secureTextEntry />
      <View style={styles.formEntryButtonView}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.formEntryButton}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignUp = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ username:"", password:"", validatePassword:"" }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUpContainer = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const u = await createUser({ username, password });
      await signIn({ username: u, password });
      history.push('/');
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUp onSubmit={onSubmit} ass={true} />
  );
};

export default SignUpContainer;