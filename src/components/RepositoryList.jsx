import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flatlist: {
    flexGrow: 1,
    flexShrink: 1
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryClickableItem = ({item, history}) => {
  const onClick = () => {
    history.push(`/singleRepo/${item.id}`);
  };
  return (
    <TouchableOpacity onPress={onClick}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

class RepositoryListClass extends React.Component {
	renderHeader = () => {
		const props = this.props;
		return (
			<View>
      <Searchbar
        placeholder="Search"
        onChangeText={props.sSV}
        value={props.sV}
      />
       <Picker
        selectedValue={props.oV}
        onValueChange={(itemValue, itemindex) => //eslint-disable-line
          props.sOV(itemValue)}
        >
        <Picker.Item label="" value={null} />
        <Picker.Item label="Latest repositories" value="CREATED_AT DESC" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE ASC" />
    </Picker>
    </View>
		);
	};

	render() {
		const props = this.props;

		const repositoryNodes = props.repositories
			? props.repositories.edges.map((edge) => edge.node)
			: [];

		return (
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({item}) => <RepositoryClickableItem item={item} history={props.history} />}
				ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReached}
        onEndReachedThreshold={0.5}
			/>
		);
	}
}

const RepositoryContainer = () => {
  const [orderVariables, setOrderVariables] = useState();
  const [searchValue, setSearchValue] = useState();
  const [value] = useDebounce(searchValue, 500);
  const { repositories, refetch, fetchMore } = useRepositories(
    { first: 4 });
  const history = useHistory();
  const [variables, setVariables] = useState({});

  const [repos, setRepos] = useState();
  useEffect(() => {
    if (repositories) {
      setRepos(repositories);
    }
  }, [repositories]);
  useEffect(() => {
    const [orderBy, orderDirection] = orderVariables ? orderVariables.split(" ") : [undefined, undefined];
    setVariables({
      orderBy, orderDirection, searchKeyword: value, first: 4
    });
    refetch(variables);
  }, [orderVariables, value]);

  const onEndReached = () => {
    fetchMore(variables);
  };
  return (
    <RepositoryListClass repositories={repos} oV={orderVariables} sOV={setOrderVariables} sV={searchValue} sSV={setSearchValue} history={history} onEndReached={onEndReached} />
  );
};

export default RepositoryContainer;