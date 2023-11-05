import Main from "./src/component/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/authStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
                <NativeRouter>
                    <Main />
                </NativeRouter>
            </AuthStorageContext.Provider>
        </ApolloProvider>
    );
}