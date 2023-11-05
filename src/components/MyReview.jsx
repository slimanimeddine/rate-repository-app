import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { MY_REVIEWS } from "../graphql/queries";
import { RepositoryReview } from "./Repository";
import { FlatList } from "react-native";

const MyReview = () => {
    const { data, loading, refetch } = useQuery(MY_REVIEWS);
    if (loading) {
        return <></>;
    }

    if (data.me.reviews === undefined) {
        return <></>;
    }

    return (
        <View>
            {data.me.reviews && (
                <FlatList
                    data={data.me.reviews.edges}
                    renderItem={({ item }) => (
                        <RepositoryReview
                            review={item}
                            myReview={true}
                            refetch={refetch}
                        />
                    )}
                    keyExtractor={(item) => item.node.id}
                />
            )}
        </View>
    );
};

export default MyReview;