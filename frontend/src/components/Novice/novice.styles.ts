import { StyleSheet } from "react-native";

const noviceStyles = StyleSheet.create({
    starRowRating: { display: "flex", alignItems: "center", height: 30 },

    radioButton: { flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly", marginTop: 10 },

    radioButtonBox: { width: "40%", justifyContent: "space-evenly" },

    radioButtonText: { marginLeft: 10, fontSize: 12 },
});

export default noviceStyles;