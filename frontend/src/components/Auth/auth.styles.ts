import { StyleSheet } from "react-native";
import { COLORS } from "../..//constants";

export default StyleSheet.create({
  //STYLING DROPDOWN
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight:'5%',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },

  //STYLING DATE
  date: {
    textAlign: 'center',
    alignItems: 'center',
    width: '35%',
    fontColor: COLORS.dark,
    backgroundColor: '#fefefe',
  }
});