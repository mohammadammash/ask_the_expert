import { StyleSheet } from "react-native";
import { COLORS } from "./src/constants/index";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  //TEXT COLORS
  orange_text: {
    color: COLORS.orange,
  },
  blue_text: {
    color: COLORS.blue
  },
  grey_text: {
    color: COLORS.grey
  },
  dark_text: {
    color: COLORS.dark
  },
  white_text: {
    color: COLORS.white,
  },
  bg_blue: {
    backgroundColor: COLORS.blue
  },
  bg_grey: {
    backgroundColor: COLORS.grey
  },
  bg_dark: {
    backgroundColor: COLORS.dark
  },

  //BORDER
  border_blue: {
    borderColor: COLORS.blue
  },

  //INPUTS
  text_input: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
  },
  search_input: {
    width: '100%',
  },
  select_input: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
  send_message_input: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  admin_search_input: {
    width: '85%',
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
    width: 300,
  },
  blue_button_lg: {
    borderWidth: 2,
    height: 60,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  blue_button_md: {
    borderWidth: 2,
    height: 60,
    width: 140,
    textTransform: "uppercase",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  blue_button_sm: {
    borderWidth: 2,
    height: 40,
    width: 104,
    textTransform: "uppercase",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },

  //CARDS:
  bg_grey_opacity30: {
    backgroundColor: 'rgba(211, 214, 219, 0.20)',
  },
  shadow_bg: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  //UTILS
  alignCenter: {
    alignItems: "center"
  },

  //screen width
  screenWidth: {
    width: width,
  }
});