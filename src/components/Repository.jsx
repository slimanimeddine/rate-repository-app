import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    FlatList,
    Pressable,
    Alert,
} from "react-native";
import React from "react";
import millify from "millify";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useNavigate, useParams } from "react-router-native";
import { openURL } from "expo-linking";
import format from "date-fns/format";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "lightgray",
        borderRadius: 10,
        padding: 10,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
    },
    tag: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        backgroundColor: "lightblue",
        padding: 2,
        borderRadius: 5,
        marginLeft: 5,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    box: {
        height: 50,
        width: 60,
        marginHorizontal: 15,
        marginTop: 10,
    },
    count: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    boxText: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
        marginLeft: 5,
        textAlign: "center",
    },
});

const RepositoryInfo = ({ repository }) => {
    const handlePress = async () => {
        await openURL(repository.url);
    };

    return (
        <View style={styles.container} testID="repoItem">
            <View style={styles.top}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: `${repository.ownerAvatarUrl}`,
                    }}
                />
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.title}>{repository.fullName}</Text>
                    <Text style={styles.subtitle}>
                        {repository.description}
                    </Text>
                </View>
            </View>

            <View style={{ alignSelf: "flex-start", marginLeft: 60 }}>
                <Text style={styles.tag}>{repository.language}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles.box} testID="stargazerCount">
                    <Text style={styles.count}>
                        {millify(repository.stargazersCount)}
                    </Text>
                    <Text style={styles.boxText}>Stars</Text>
                </View>
                <View style={styles.box} testID="forksCount">
                    <Text style={styles.count}>
                        {millify(repository.forksCount)}
                    </Text>
                    <Text style={styles.boxText}>Forks</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.count}>
                        {millify(repository.reviewCount)}
                    </Text>
                    <Text style={styles.boxText}>Reviews</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.count}>
                        {millify(repository.ratingAverage)}
                    </Text>
                    <Text style={styles.boxText}>Rating</Text>
                </View>
            </View>

            <Button onPress={handlePress} title="Open in GitHub" />
        </View>
    );
};

const reviewStyles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "lightgray",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginLeft: 5,
    },
    text: {
        fontSize: 14,
        color: "black",
        padding: 2,
        borderRadius: 5,
        marginLeft: 5,
    },
    rating: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    left: {
        marginVertical: 20,
        padding: 5,
        width: 80,
        height: 40,
    },
    right: {
        flexShrink: 1,
    },
    textWithRoundBorder: {
        borderRadius: 40,
        color: "blue",
        fontWeight: "bold",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "blue",
        padding: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    buttons: {
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    redButton: {
        backgroundColor: "lightcoral",
    },
    blueButton: {
        backgroundColor: "lightblue",
    },
    buttonText: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
});

export const RepositoryReview = ({ review, myReview, refetch }) => {
    const { node } = review;
    const navigate = useNavigate();
    const [deleteReview, { loading }] = useMutation(DELETE_REVIEW) 
    
    if(loading){
        return <Text>Loading...</Text>
    }

    return (
        <View style={reviewStyles.container}>
            <View style={[reviewStyles.rating, reviewStyles.left]}>
                <Text style={reviewStyles.textWithRoundBorder}>
                    {node.rating}
                </Text>
            </View>
            <View style={reviewStyles.right}>
                {!myReview ? (
                    <Text style={reviewStyles.title}>{node.user.username}</Text>
                ) : (
                    <Text style={reviewStyles.title}>
                        {node.repository.name}
                    </Text>
                )}

                <Text style={reviewStyles.subtitle}>
                    {format(new Date(node.createdAt), "dd-MM-yyyy")}
                </Text>
                <Text style={reviewStyles.text}>{node.text}</Text>
                {myReview ? (
                    <View style={reviewStyles.buttonContainer}>
                        <Pressable
                            style={[
                                reviewStyles.buttons,
                                reviewStyles.blueButton,
                            ]}
                            onPress={() => {
                                console.log(node.repository.id);
                                navigate(`/repository/${node.repository.id}`);
                            }}
                        >
                            <Text style={reviewStyles.buttonText}>
                                See Repo
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                reviewStyles.buttons,
                                reviewStyles.redButton,
                            ]}
                            onPress={() => {
                                Alert.alert("Delete", "Are you sure?", [
                                    {
                                        text: "Cancel",
                                        onPress: () =>
                                            console.log("Cancel Pressed"),
                                    },
                                    {
                                        text: "OK",
                                        onPress: async () => {
                                            const res = await deleteReview({
                                                variables: {
                                                    deleteReviewId: node.id,
                                                },
                                            });
                                            console.log(res)
                                            await refetch();
                                        },
                                    },
                                ]);
                            }}
                        >
                            <Text style={reviewStyles.buttonText}>
                                Delete Review
                            </Text>
                        </Pressable>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const Repository = () => {
    const { id } = useParams();
    let variables = {
        repositoryId: id,
        first: 3,
        after: "",
    };
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: "cache-and-network",
    });

    if (loading) {
        return <></>;
    }
    const { repository } = data;
    const { reviews } = repository;
    const { hasNextPage, endCursor } = reviews.pageInfo;
    return (
        <FlatList
            ListHeaderComponent={<RepositoryInfo repository={repository} />}
            data={reviews.edges}
            renderItem={({ item }) => <RepositoryReview review={item} />}
            keyExtractor={(item) => item.node.id}
            onEndReached={() => {
                if (hasNextPage) {
                    variables = {
                        ...variables,
                        after: endCursor,
                    };

                    fetchMore({
                        variables,
                    });
                }
            }}
            onEndReachedThreshold={0.5}
        />
    );
};

export default Repository;