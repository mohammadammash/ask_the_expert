import { StyleSheet, Dimensions } from "react-native";
//internal
import { COLORS } from "../../constants";
const { width } = Dimensions.get("screen");

const navigationStyles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: "absolute",
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderColor: COLORS.blue,
  },
  drawerListWrapper: {
    marginTop: 65,
  },
});

export default navigationStyles;