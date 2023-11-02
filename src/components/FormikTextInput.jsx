import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
		color: 'red',
	},
	input: {
		width: '100%',
		fontSize: 18,
		textAlign: 'left',
		paddingVertical: 10,
		paddingLeft: 15,
		borderWidth: 1,
		borderRadius: 5,
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
				style={{
					...styles.input,
					borderColor: showError ? 'red' : 'gray'
				}}
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;
