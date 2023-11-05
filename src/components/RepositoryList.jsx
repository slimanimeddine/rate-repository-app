import { FlatList, View, StyleSheet, Text } from "react-native";
import useRepositories from "../hooks/useRepositories";
import SortPicker from "./SortPicker";
import RepositoryItem from "./RepositoryItem ";
import { memo, useState } from "react";
import { Search } from "./Search";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
	repositories,
	selected,
	setSelected,
	fetchMore,
}) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<>
			<FlatList
				ListHeaderComponent={
					<SortPicker selected={selected} setSelected={setSelected} />
				}
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item, index }) => (
					<RepositoryItem item={item} key={index}></RepositoryItem>
				)}
				onEndReached={() => {
					fetchMore();
				}}
				onEndReachedThreshold={0.5}
			/>
		</>
	);
};

const RepositoryList = ({ search }) => {
	const [selected, setSelected] = useState("LATEST");

	const [debouncedSearch] = useDebounce(search, 500);

	const { repositories, loading, fetchMore } = useRepositories(
		selected,
		debouncedSearch
	);

	if (loading) {
		return <></>;
	}

	return (
		<>
			<RepositoryListContainer
				repositories={repositories}
				selected={selected}
				setSelected={setSelected}
				fetchMore={fetchMore}
			/>
		</>
	);
};

const RepositoryView = () => {
	const [search, setSearch] = useState("");

	return (
		<>
			<Search search={search} setSearch={setSearch} />
			<RepositoryList search={search} />
		</>
	);
};

export default RepositoryView;