import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "./src/constants/index";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  //FONTS
  main_regular: {
    fontFamily: FONTS.MAIN_REGULAR
  },
  main_italic: {
    fontFamily: FONTS.MAIN_ITALIC
  },
  main_bold: {
    fontFamily: FONTS.MAIN_BOLD
  },

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
  bg_white: {
    backgroundColor: COLORS.white
  },

  //BORDER
  border_blue: {
    borderColor: COLORS.blue
  },
  border_grey: {
    borderColor: COLORS.grey,
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
  },
  send_message_input: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  admin_search_input: {
    width: '85%',
    borderWidth: 2,
  },

  //BUTTONS
  blue_button_xl: {
    borderWidth: 2,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    width: '100%',
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
    height: 50,
    width: 130,
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
  blue_button_xs: {
    borderWidth: 2,
    height: 40,
    width: 80,
    textTransform: "uppercase",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  //CLICK BUTTON STYLE CHANGE
  button_click_style: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
  },
  button_click_text_style: {
    color: COLORS.blue,
  },
  button_text: {
    color: COLORS.white,
    textTransform: 'uppercase'
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
    borderColor: COLORS.blue,
  },

  //UTILS
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  //screen width
  screenWidth: {
    width: width,
  }
});