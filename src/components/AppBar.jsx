import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBarEntry = ({ text, address }) => {
  return (
    <Link to={address}>
      <Text style={styles.entry}>{ text }</Text>
      </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarEntry text='Repositories' address='/' />
        <AppBarEntry text='Sign In' address='/signIn' />
      </ScrollView>
    </View>
    );
};

export default AppBar;