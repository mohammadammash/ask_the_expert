import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const noviceStyles = StyleSheet.create({
    starRowRating: { display: "flex", alignItems: "center", height: 30 },

    radioButton: { flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly", marginTop: 10 },

    radioButtonBox: { paddingLeft: 15, width: "40%", height: 60, justifyContent: "space-evenly" },

    radioButtonText: { marginLeft: 13, fontSize: 12 },

    //DARK MODE
    radioButtonBoxDark: { backgroundColor: 'transparent' },
    radioButtonTextDark: { color: COLORS.white }
});

export default noviceStyles;