import AsyncStorage from "@react-native-async-storage/async-storage";

// alternative to async storage is secure storage
// read more here: https://docs.expo.dev/versions/latest/sdk/securestore/

class AuthStorage {
	constructor(namespace = "auth") {
		this.namespace = namespace;
	}

	async getAccessToken() {
		// Get the access token for the storage
		const token = await AsyncStorage.getItem(`${this.namespace}:token`);
		return token ? JSON.parse(token) : null;
	}

	async setAccessToken(accessToken) {
		// Set the access token in the storage
		await AsyncStorage.setItem(
			`${this.namespace}:token`,
			JSON.stringify(accessToken)
		);
	}

	async removeAccessToken() {
		// Remove the access token from the storage
		await AsyncStorage.removeItem(`${this.namespace}:token`);
	}
}

export default AuthStorage;