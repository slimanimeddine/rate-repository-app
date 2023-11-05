import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { ADD_REVIEW } from "../graphql/mutations";
import { MY_REVIEWS } from "../graphql/queries";

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
    error:{
        color: "red",
        fontSize: 14,
        margin: 10,
    }, 
    loading:{
        color: "blue",
        fontSize: 14,
        margin: 10,
    },
});
    

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
        .number()
        .min(1, "Rating must be greater than 1 or higher")
        .max(100, "Rating must be less than or equal to 100")
        .required("Rating is required"),
    review: yup.string(),
});

export const Review = () => {
    const navigate = useNavigate();
    const [mutation, { loading, error }] = useMutation(ADD_REVIEW);

    if (loading) return <Text style={styles.loading}>Loading...</Text>;
    if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

    const handleSubmission = async (values, { resetForm }) => {
        const { ownerName, repositoryName, rating, review: text } = values;
        const { data, errors } = await mutation({
            variables: {
                review: {
                    ownerName,
                    repositoryName,
                    rating: Number(rating),
                    text,
                },
            },
            refetchQueries: [{ query: MY_REVIEWS }],
        });
        if (data) {
            navigate(`/repository/${ownerName}.${repositoryName}`);
        } else {
            console.log(errors);
        }
    };

    return (
        <View>
            <Formik
                initialValues={{
                    ownerName: "",
                    repositoryName: "",
                    rating: "",
                    review: "",
                }}
                onSubmit={(values, actions) => {
                    handleSubmission(values, actions);
                }}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Repository owner name"
                            onChangeText={props.handleChange("ownerName")}
                            value={props.values.ownerName}
                            onBlur={props.handleBlur("ownerName")}
                        />
                        {props.touched.ownerName && props.errors.ownerName && (
                            <Text style={styles.errorText}>
                                {props.errors.ownerName}
                            </Text>
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Repository name"
                            onChangeText={props.handleChange("repositoryName")}
                            value={props.values.repositoryName}
                            onBlur={props.handleBlur("repositoryName")}
                        />
                        {props.touched.repositoryName &&
                            props.errors.repositoryName && (
                                <Text style={styles.errorText}>
                                    {props.errors.repositoryName}
                                </Text>
                            )}
                        <TextInput
                            style={styles.input}
                            placeholder="Rating between 0 and 100"
                            onChangeText={props.handleChange("rating")}
                            value={props.values.rating}
                            onBlur={props.handleBlur("rating")}
                        />
                        {props.touched.rating && props.errors.rating && (
                            <Text style={styles.errorText}>
                                {props.errors.rating}
                            </Text>
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Review"
                            onChangeText={props.handleChange("review")}
                            value={props.values.review}
                            onBlur={props.handleBlur("review")}
                            multiline={true}
                        />
                        {props.touched.review && props.errors.review && (
                            <Text style={styles.errorText}>
                                {props.errors.review}
                            </Text>
                        )}
                        <Pressable onPress={() => props.handleSubmit()}>
                            <Text style={styles.submitBtn}>Submit</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </View>
    );
};