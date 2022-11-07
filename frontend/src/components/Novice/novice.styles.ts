import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const noviceStyles = StyleSheet.create({
    bottomSheetModalWrapper: { backgroundColor: "rgba(255,255,255,0.9)" },

    bottomSheetModalContainer: { borderTopWidth: 2, borderColor: COLORS.dark, alignItems: "center", height: "40%" },

    starRowRating: { display: "flex", alignItems: "center", height: 30 },

    radioButton: { flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly", marginTop: 10 },

    radioButtonBox: { width: "40%", justifyContent: "space-evenly" },

    radioButtonText: { marginLeft: 10, fontSize: 12 },
});

export default noviceStyles;