import { StyleSheet } from "react-native";
import styles from "../../../styles";
import { COLORS } from "../..//constants";

const commonStyles = StyleSheet.create({
  //CONFIRM AVAILABILITY STYLES
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

  //EDIT PROFILE LANGUAGE AND THEME INPUT STYLES
  edit_dropdown: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  edit_placeholderStyle: {
    fontSize: 16,
  },
  edit_selectedTextStyle: {
    fontSize: 16,
  },
  edit_iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  //LEADERBOARD COLORS
  leaderboard_card: {
    borderColor: COLORS.grey,
    backgroundColor: "rgba(211, 214, 219, 0.1)",
    borderWidth: 2,
    borderRadius: 10,
  },
  gold_card: {
    borderColor: "#E89923",
    backgroundColor: "rgba(232, 153, 35, 0.2)",
    borderBottomColor: "#E89923",
    borderWidth: 3,
    borderRadius: 10,
  },
  gold_text: {
    color: "#E89923",
  },
  grey_card: {
    borderColor: "#868686",
    backgroundColor: "rgba(134, 134, 134, 0.1)",
    borderWidth: 3,
  },
  grey_text: {
    color: "#868686",
  },
  bronze_card: {
    borderColor: "#AC5E10",
    backgroundColor: "rgba(172, 94, 16, 0.1)",
    borderWidth: 3,
  },
  bronze_text: {
    color: "#AC5E10",
  },

  //NOVICES PROFILE ABOUT
  novice_about: {
    backgroundColor: COLORS.grey,
    height: '100%',
    alignItems: 'center',
    paddingTop: 25,
  },

  //EXPERT PROFILE ABOUT
  expert_about: {
    paddingVertical: 25,
  }
});

export default commonStyles;