import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#24292e',
		// display: 'flex',
		// flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
	},
	pressable: {
		color: 'white',
		fontSize: 24,
		fontWeight: '700',
		padding: 10,
	},
	signIn: {
		color: 'white',
		fontSize: 16,
		fontWeight: '400',
		padding: 10,
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer} horizontal>
				<Pressable>
					<Text style={styles.pressable}>Repositories</Text>
				</Pressable>
				<Link to='/sign-in'>
					<Text style={styles.pressable}>Sign in</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;
