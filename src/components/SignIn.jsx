import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

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
		paddingVertical: 10,
	},
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
				secureTextEntry={true}
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

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	height: yup.string().required('Password is required'),
});

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
				validationSchema={validationSchema}
			>
				{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
			</Formik>
		</View>
	);
};

export default SignIn;
