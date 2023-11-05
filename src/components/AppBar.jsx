import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { LOGIN_STATUS } from "../graphql/queries";
import AuthStorageContext from "../contexts/authStorageContext";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00BFFF",
        paddingHorizontal: 10,
        paddingVertical: 30,
        flexDirection: "row",
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    item: {
        marginRight: 10,
    },
});

const AppBar = () => {
    const { data, loading } = useQuery(LOGIN_STATUS, {
        fetchPolicy: "cache-and-network",
    });

    const auth = useContext(AuthStorageContext);

    const apollo = useApolloClient();

    if (loading) {
        return <></>;
    }

    const handleOnPress = async () => {
        await auth.removeAccessToken();
        apollo.resetStore();
    };
    const showLogOut = data ? data["me"] : false;

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Pressable style={styles.item}>
                    <Link to="/">
                        <Text style={styles.text}>Repositories</Text>
                    </Link>
                </Pressable>
                {showLogOut ? (
                    <>
                        <Pressable style={styles.item}>
                            <Link to="/myReviews">
                                <Text style={styles.text}>My Reviews</Text>
                            </Link>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Link to="/createReview">
                                <Text style={styles.text}>Create a review</Text>
                            </Link>
                        </Pressable>
                        <Pressable style={styles.item} onPress={handleOnPress}>
                            <Text style={styles.text}>Sign Out</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Pressable style={styles.item}>
                            <Link to="/login">
                                <Text style={styles.text}>Sign In</Text>
                            </Link>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Link to="/signup">
                                <Text style={styles.text}>Sign Up</Text>
                            </Link>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;