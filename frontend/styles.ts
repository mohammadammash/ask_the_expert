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
  search_input:{
    width:'80%',
  },
    select_input: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
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
    blue_button_md: {
      borderWidth: 2,
      height: 60,
      width:140,
      textTransform: "uppercase",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.blue,
    },
    blue_button_sm: {
      borderWidth: 2,
      height: 40,
      width:104,
      textTransform: "uppercase",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.blue,
    },
  
  //CARDS:
  bg_grey_opacity30: {
    backgroundColor: 'rgba(211, 214, 219, 0.20)',
  }
});