import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	mainView: {
		display: 'flex',
		padding: 10,
		gap: 20,
	},
	topView: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
	},
	topViewRightItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		flexShrink: 1,
		gap: 10,
	},
	bigText: {
		fontSize: 16,
		fontWeight: '700',
	},
	mediumText: {
		fontSize: 16,
		color: 'gray',
	},
	description: {
		fontSize: 16,
		color: 'gray',
		flexShrink: 1
	},
	language: {
		backgroundColor: 'blue',
		color: 'white',
		padding: 3,
		borderRadius: 5,
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 5,
	},
	bottomView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30,
	},
	bottomViewItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 5,
	},
});

const formatNumber = (number) => {
	if (number >= 1000) {
		return (number / 1000).toFixed(1) + 'k';
	} else {
		return number.toString();
	}
};

const StatItem = ({ name, value }) => {
	return (
		<View style={styles.bottomViewItem}>
			<Text style={styles.bigText}>{formatNumber(value)}</Text>
			<Text style={styles.mediumText}>{name}</Text>
		</View>
	);
};

const RepositoryItem = ({ item }) => {
	const itemStats = [
		{
			name: 'Stars',
			value: item.stargazersCount,
		},
		{
			name: 'Forks',
			value: item.forksCount,
		},
		{
			name: 'Reviews',
			value: item.reviewCount,
		},
		{
			name: 'Rating',
			value: item.ratingAverage,
		},
	];
	return (
		<View style={styles.mainView}>
			<View style={styles.topView}>
				<Image
					source={{
						uri: item.ownerAvatarUrl,
					}}
					style={styles.image}
				/>
				<View style={styles.topViewRightItem}>
					<Text style={styles.bigText}>{item.fullName}</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.description}>{item.description}</Text>
					</View>
					<Text style={styles.language}>{item.language}</Text>
				</View>
			</View>
			<FlatList
				data={itemStats}
				style={styles.bottomView}
				renderItem={({ item }) => (
					<StatItem
						name={item.name}
						value={item.value}
					/>
				)}
				keyExtractor={(item) => item.name}
			/>
		</View>
	);
};

export default RepositoryItem;
