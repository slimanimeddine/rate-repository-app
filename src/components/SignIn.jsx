import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	home: {
		fontSize: 16,
		fontWeight: '400',
		padding: 10,
	}
});

const SignIn = () => {
	return (
		<View style={styles.container}>
			<Link to='/'>
				<Text style={styles.home}>Home</Text>
			</Link>
			<Text>The sign-in view</Text>
		</View>
	);
};

export default SignIn;
