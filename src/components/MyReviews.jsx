import React, { useState, useEffect } from 'react';
import Text from './Text';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser';
import { styles } from './RepositoryItemPage';
import theme from '../theme';
import * as Linking from 'expo-linking';
import { DELETE_REVIEW } from './graphql/mutations';
import { useMutation } from '@apollo/client';

const reviewStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22.5,
    paddingBottom: 15
  },
  openButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    width: '50%',
    textAlign: 'center',
    marginRight: 7.5,
    borderRadius: 10
  },
  openButtonText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: 'white'
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    width: '50%',
    textAlign: 'center',
    marginLeft: 7.5,
    borderRadius: 10
  },
  deleteButtonText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: 'white'
  }
});

const ReviewItem = ({ item, onDelete }) => {

  const onOpenGithub = () => {
    Linking.openURL(item.repository.url);
  };

  const date = item.createdAt.split(/[-T]+/g).splice(0, 3).join('.');
  return (
    <View>
      <View style={styles.commentItem}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.flexColumn}>
          <Text fontSize='subheading' fontWeight='bold'>{item.repository.fullName}</Text>
          <Text style={styles.reviewDate}>{date}</Text>
          <Text>{item.text}</Text>
        </View>
      </View>
      <View style={reviewStyles.buttonContainer}>
        <TouchableOpacity style={reviewStyles.openButton} onPress={onOpenGithub}>
          <Text style={reviewStyles.openButtonText}>Open in github</Text>
        </TouchableOpacity>
        <TouchableOpacity style={reviewStyles.deleteButton} onPress={() => onDelete(item.id)}>
          <Text style={reviewStyles.deleteButtonText}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [u, setU] = useState();
  const [reviews, setReviews] = useState();
  const { user, loading, refetch } = useAuthenticatedUser();
  const [ mutate ] = useMutation(DELETE_REVIEW);

  useEffect(() => {
    if (user) {
      setU(user);
      setReviews(user.reviews.edges.map(e => e.node));
    }
  }, [user, loading]);

  const onDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure that you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log('deleting cancelled'),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteReview(id) }
      ]
    );
  };

  const deleteReview = async (id) => {
    await mutate({ variables: { id } });
    refetch();
  };


  if (!u || loading) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
            style={styles.flatlist}
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <ReviewItem item={item} onDelete={onDeleteReview} />}
          />
    </View>
  );
};

export default MyReviews;