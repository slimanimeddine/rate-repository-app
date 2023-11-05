import Constants from "expo-constants";
import { StyleSheet, View, Platform } from "react-native";
import AppBar from "./AppBar";
import { Route, Routes, Navigate, useNavigate } from "react-router-native";
import SignIn from "./SignIn";
import Repository from "./Repository";
import { Review } from "./Review";
import SignUp from "./SignUp";
import RepositoryView from "./RepositoryList ";
import MyReview from "./MyReview";

const styles = StyleSheet.create({
    container: {
        fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryView />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
				<Route path="/repository/:id" element={<Repository/>} />
				<Route path="/createReview" element={<Review/>}/>
				<Route path="/signup" element={<SignUp />} />
                <Route path="/myReviews" element={<MyReview />} />
            </Routes>
        </View>
    );
};

export default Main;