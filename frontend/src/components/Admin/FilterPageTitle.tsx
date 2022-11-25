import { View, Text } from 'react-native'
import React from 'react';
import { USERS_TYPES_OPTIONS } from "../../constants";
import adminStyles from "./admin.styles";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

const FilterPageTitle = ({textcolor_style, shownUsersType, cardbgcolor_style, handleShownUserType}) => {
  return (
    <View className="flex-row  items-center w-full justify-between pr-3 pl-7">
      <Text style={textcolor_style} className="font-bold">
        View All {shownUsersType.charAt(0).toUpperCase() + shownUsersType.slice(1) + (shownUsersType === "users" ? "" : "s")}
      </Text>
      <SelectCountry
        style={[adminStyles.dropdown, cardbgcolor_style]}
        selectedTextStyle={adminStyles.selectedTextStyle}
        placeholderStyle={adminStyles.placeholderStyle}
        iconStyle={adminStyles.iconStyle}
        maxHeight={200}
        renderRightIcon={() => <Ionicons name="filter" size={18} color="black" />}
        value={shownUsersType}
        data={USERS_TYPES_OPTIONS}
        valueField="value"
        labelField="label"
        imageField="image"
        placeholder="All"
        searchPlaceholder="Search..."
        onChange={(e) => handleShownUserType(e.value)}
      />
    </View>
  );
}

export default FilterPageTitle