import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import millify from "millify";
import { useNavigate } from "react-router-native";

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



const RepositoryItem = ({ item }) => {
    const navigation = useNavigate();

    const handlePress = () => {
        navigation(`/repository/${item.id}`);
    };

    return (
        <Pressable onPress={handlePress} style={styles.container} testID="repoItem">
            <View style={styles.top}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: `${item.ownerAvatarUrl}`,
                    }}
                />
                {/* this flex shrink makes the text stay within the view which is within the the top view */}
                <View style={{ flexShrink: 1 }}> 
                    <Text style={styles.title}>{item.fullName}</Text>
                    <Text style={styles.subtitle}>{item.description}</Text>
                </View>
            </View>

            <View style={{ alignSelf: "flex-start", marginLeft: 60 }}>
                <Text style={styles.tag}>{item.language}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles.box} testID="stargazerCount">
                    <Text style={styles.count}>
                        {millify(item.stargazersCount)}
                    </Text>
                    <Text style={styles.boxText}>Stars</Text>
                </View>
                <View style={styles.box} testID="forksCount">
                    <Text style={styles.count}>{millify(item.forksCount)}</Text>
                    <Text style={styles.boxText}>Forks</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.count}>
                        {millify(item.reviewCount)}
                    </Text>
                    <Text style={styles.boxText}>Reviews</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.count}>
                        {millify(item.ratingAverage)}
                    </Text>
                    <Text style={styles.boxText}>Rating</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default RepositoryItem;