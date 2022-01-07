import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flatlist: {
    flexGrow: 1,
    flexShrink: 1
  },
  repoItem: {
    backgroundColor: 'white',
    padding: 15
  },
  tinyLogo: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  flexColumnCentered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  flexRowCentered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  languageLabel: {
    backgroundColor: theme.colors.primary,
    padding: 7,
    borderRadius: 5,
    color: 'white',
    marginTop: 7,
    flex: 0
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const NumAndLabel = ({ value, label }) => {
  const parsedValue = value > 1000 ? `${Math.round(value/100)/10}k` : `${value}`;
  return (
    <View stype={[styles.flexColumnCentered]}>
      <Text style={{textAlign: 'center'}} fontWeight='bold'>{parsedValue}</Text>
      <Text style={{textAlign: 'center'}}>{label}</Text>
    </View>
  );
};

const RepositoryItem = (props) => {
  const entry = props.item;
  return (
    <View style={styles.repoItem}>
      <View style={styles.flexColumn}>
        <View style={[styles.flexRow]}>
          <Image
            style={styles.tinyLogo}
            source={{uri:entry.ownerAvatarUrl}}
          />
          <View style={[{ flex: 1 }, styles.flexColumn]}>
            <Text fontSize='subheading' fontWeight='bold'>{entry.fullName}</Text>
            <Text>{entry.description}</Text>
            <View style={styles.languageLabel}>
              <Text style={{ color: 'white' }}>{entry.language}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.flexRowCentered]}>
          <NumAndLabel label='Stars' value={entry.stargazersCount} />
          <NumAndLabel label='Forks' value={entry.forksCount} />
          <NumAndLabel label='Reviews' value={entry.reviewCount} />
          <NumAndLabel label='Rating' value={entry.ratingAverage} />
        </View>
      </View>
    </View>
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  if (loading) return <Text>Loading</Text>;
  return (
    <FlatList
      style={styles.flatlist}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      // other props
    />
  );
};

export default RepositoryList;