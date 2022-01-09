import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";


import { GET_AUTHORIZED_USER } from './graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  entry: {
    color: theme.colors.appBarText,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBarEntry = ({ text, address }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  if (address) {
    return (
      <Link to={address}>
        <Text style={styles.entry}>{ text }</Text>
        </Link>
    );
  } else {
    return (
      <TouchableOpacity onPress={onSignOut}>
        <Text style={styles.entry}>{ text }</Text>
        </TouchableOpacity>
    );
  }
};

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (data) {
      setLoggedUser(data.authorizedUser);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarEntry text='Repositories' address='/' />
        { loggedUser
          ? <>
              <AppBarEntry text='Create a review' address='/createReview' />
              <AppBarEntry text='Logout' />
            </>
          : <>
              <AppBarEntry text='Sign In' address='/signIn' />
              <AppBarEntry text='Sign Up' address='/signUp' />
            </> }
      </ScrollView>
    </View>
    );
};

export default AppBar;