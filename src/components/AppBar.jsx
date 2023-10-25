import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		// ...
        backgroundColor: "#24292e"
	},
    pressable: {
        color: "white",
        fontSize: 24,
        fontWeight: '700',
        padding: 10
    }
	// ...
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text style={styles.pressable}>Repositories</Text>
			</Pressable>
		</View>
	);
};

export default AppBar;
