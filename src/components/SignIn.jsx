import { View, StyleSheet, Text, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	home: {
		fontSize: 16,
		fontWeight: '400',
		padding: 10,
	},
	form: {
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		gap: 10,
		padding: 10,
	},
	submitBtn: {
		width: '100%',
		backgroundColor: 'blue',
		color: 'white',
		borderRadius: 5,
		textAlign: 'center',
		fontSize: 24,
		fontWeight: '700',
		paddingVertical: 10
	}
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.form}>
			<FormikTextInput
				name='username'
				placeholder='Username'
			/>
			<FormikTextInput
				name='password'
				placeholder='Password'
			/>
			<Pressable onPress={onSubmit}>
				<Text style={styles.submitBtn}>Sign in</Text>
			</Pressable>
		</View>
	);
};

const initialValues = {
	username: '',
	password: '',
};

const SignIn = () => {
	const onSubmit = (values) => {
		const username = values.username;
		const password = values.password;

		console.log(`username: ${username}, password: ${password}`);
	};
	return (
		<View>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
			>
				{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
			</Formik>
		</View>
	);
};

export default SignIn;
