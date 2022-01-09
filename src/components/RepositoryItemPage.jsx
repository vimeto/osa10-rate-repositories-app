import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
/* import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO_BY_ID } from './graphql/queries'; */
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';
import useRepository from '../hooks/useRepository';

export const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flatlist: {
    flexGrow: 1,
    flexShrink: 1
  },
  repoItem: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  urlButton: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 7,
    padding: 10
  },
  urlButtonText: {
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: 'white'
  },
  commentItem: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1
  },
  rating: {
    padding: 5,
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: 'solid',
    flex: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginRight: 10
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: 20
  },
  reviewDate: {
    color: theme.colors.textSecondary,
    paddingBottom: 7,
    paddingTop: 2
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

/* const RepositoryItemSingle = ({ item }) => {
  const onClick = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.repoItem}>
      <RepositoryItem item={item} />
      <TouchableOpacity style={styles.urlButton} onPress={onClick}>
        <Text style={styles.urlButtonText}>Open in GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}; */

const ReviewItem = ({ item }) => {
  const date = item.createdAt.split(/[-T]+/g).splice(0, 3).join('.');
  return (
    <View style={styles.commentItem}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.flexColumn}>
        <Text fontSize='subheading' fontWeight='bold'>{item.user.username}</Text>
        <Text style={styles.reviewDate}>{date}</Text>
        <Text>{item.text}</Text>
      </View>
    </View> 
  );
};

const RepoHeader = ({ repository }) => {
  const item = repository;
  const onClick = () => {
    Linking.openURL(item.url);
  };
  return (
    <View style={styles.repoItem}>
      <RepositoryItem item={item} />
      <TouchableOpacity style={styles.urlButton} onPress={onClick}>
        <Text style={styles.urlButtonText}>Open in GitHub</Text>
      </TouchableOpacity>
    </View>
  );
};

const RepositoryItemPage = ({ repository, reviews, loading, onEndReached }) => {
  const [repo, setRepo] = useState();
  const [repoReviews, setRepoReviews] = useState();

  useEffect(() => {
    setRepo(repository);
  }, [repository]);

  useEffect(() => {
    setRepoReviews(reviews);
  });

  return (
    <>
      { loading || !repo ? <Text>sdjklfalsdkjfhaösdfjkasödfj</Text> : (
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.flatlist}
            data={repoReviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={ReviewItem}
            ListHeaderComponent={() => <RepoHeader repository={repo} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.0}
            keyExtractor={(item, index) => `${item.id}${index}`}
          />
        </View>
      )}
    </>
  );
};

const RepositoryItemPageContainer = () => {
  const variables = { id: useParams().id, first: 4 };
  const { repository, reviews, loading, fetchMore } = useRepository(variables);
  const [repo, setRepo] = useState();
  const [repoReviews, setRepoReviews] = useState();

  useEffect(() => {
    if (repository) {
      console.log('called');
      setRepoReviews(reviews);
      if (!repo) {
        console.log('called 2');
        setRepo(repository);
      }
    }
  }, [loading, reviews]);

  const onEndReached = () => {
    fetchMore();
  };

  if (loading || !repo) {
    return null;
  }

  return (
    <RepositoryItemPage loading={loading} repository={repo} reviews={repoReviews} onEndReached={onEndReached} />
  );
};

export default RepositoryItemPageContainer;