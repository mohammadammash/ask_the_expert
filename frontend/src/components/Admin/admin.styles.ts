import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";


const adminStyles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 90,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderColor: COLORS.blue,
    },
    placeholderStyle: {
        fontSize: 12,
        marginLeft: 5,
    },
    selectedTextStyle: {
        fontSize: 12,
        marginLeft: 5,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default adminStyles;