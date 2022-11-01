import { View, Text, TextInput } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
//internal imports
import styles from "../../../styles";
import { ROUTES } from "../../constants";
import commonStyles from "../../components/Common/common.styles";
import { USERS_TYPES_OPTIONS } from "../../constants";
import { FilterPageTitleProps } from "./types";


const FilterPageTitle: React.FC<FilterPageTitleProps> = ({ userType, handleShownUserType, route_name }) => {
  return (
    <View className="h-2/6 w-full justify-start">
      <View className="flex-row  items-center w-full justify-between pr-3 pl-7">
        <Text className="font-bold">
          View {route_name === ROUTES.ADMIN_VIEW_BANNED_USERS ? "Banned" : "All"} {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Text>
        <SelectCountry
          style={commonStyles.dropdown}
          selectedTextStyle={commonStyles.selectedTextStyle}
          placeholderStyle={commonStyles.placeholderStyle}
          iconStyle={commonStyles.iconStyle}
          maxHeight={200}
          renderRightIcon={() => <Ionicons name="filter" size={18} color="black" />}
          value={userType}
          data={USERS_TYPES_OPTIONS}
          valueField="value"
          labelField="label"
          imageField="image"
          placeholder="All"
          searchPlaceholder="Search..."
          onChange={(e) => handleShownUserType(e.value)}
        />
      </View>
      {/* SEARCH BAR */}
      <View className="items-center">
        <TextInput style={[styles.text_input, styles.admin_search_input]} className="placeholder:pl-3" placeholder="Search" />
      </View>
    </View>
  );
};

export default FilterPageTitle;
