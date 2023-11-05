import {
    TextInput,
    Button,
    View,
    StyleSheet,
    Text,
    Pressable,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    errorText: {
        color: "red",
    },
    submitBtn: {
        backgroundColor: "#00BFFF",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
});

export const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, "username must be greater or equal to 4 characters")
        .required("username is required"),
    password: yup
        .string()
        .min(6, "Password must be greater or equal to 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null])
        .required("Password is required"),
});

const SignUp = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const [mutation, {error, loading}] = useMutation(SIGN_UP);

    const onFormSubmit = async (values) => {
        const { username, password, confirmPassword } = values;
        const {data, errors} = await mutation({
            variables: {
                user: {
                    username,
                    password,
                },
            },
        });

        if(data){
            const result = await signIn({ username, password });
            if(result){
                navigate("/");
            }
        }
        else{
            console.log(errors);
        }
    };

    if (error) {
       return <Text style={{color: "red"}}>{error.message}</Text>;
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <SignInForm
            handler={onFormSubmit}
            validationSchema={validationSchema}
        />
    );
};

export const SignInForm = ({ handler, validationSchema }) => {
    return (
        <View>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={async (values, actions) => {
                    actions.resetForm();
                    await handler(values);
                }}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="username"
                            onChangeText={props.handleChange("username")}
                            value={props.values.username}
                            onBlur={props.handleBlur("username")}
                        />
                        {props.touched.username && props.errors.username && (
                            <Text style={styles.errorText}>
                                {props.errors.username}
                            </Text>
                        )}
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="password"
                            onChangeText={props.handleChange("password")}
                            value={props.values.password}
                            onBlur={props.handleBlur("password")}
                        />
                        {props.touched.password && props.errors.password && (
                            <Text style={styles.errorText}>
                                {props.errors.password}
                            </Text>
                        )}
                        <TextInput
                            secureTextEntry
                            style={styles.input}
                            placeholder="confirm password"
                            onChangeText={props.handleChange("confirmPassword")}
                            value={props.values.confirmPassword}
                            onBlur={props.handleBlur("confirmPassword")}
                        />
                        {props.touched.confirmPassword &&
                            props.errors.confirmPassword && (
                                <Text style={styles.errorText}>
                                    {props.errors.confirmPassword}
                                </Text>
                            )}

                        <Pressable testID="signin" onPress={props.handleSubmit}>
                            <Text style={styles.submitBtn} title="Submit">
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default SignUp;