import { StyleSheet, View, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SortPicker({ selected, setSelected }) {
    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
            >
                <Picker.Item label="Latest repositories" value="LATEST" />
                <Picker.Item label="Highest rated repositories" value="ASC" />
                <Picker.Item label="Lowest rated repositories" value="DESC" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 3,
        borderRadius: 15, 
        margin: 5,
    },
    picker: {
        width: "100%",
        height: 25,
        margin: 10,
        borderWidth: 0, 
    },
    item: {
        fontSize: 20,
        fontWeight: "bold",
    },
});