import { StyleSheet } from "react-native";
import {COLORS} from "./src/constants/index";

export default StyleSheet.create({
  //COLORS
  orange_text : {
    color: COLORS.orange,
  },
  //INPUTS
  text_input: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
  },
  //BUTTONS
    blue_button_xl: {
      borderWidth: 2,
      height: 60,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.blue,
      color: COLORS.white,
    },
    blue_button_lg: {
      borderWidth: 2,
      height: 60,
      width:200,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.blue,
    },
  //SELECT INPUTS:
  select_input: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
});