import { View, ScrollView, TextInput, Text } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
//internal imports
import styles from "../../../styles";
import { ROUTES } from "../../constants";
import adminStyles from "./admin.styles";
import { USERS_TYPES_OPTIONS } from "../../constants";
import { UserCardComponent } from "../../components";

const ViewUsersScreen = () => {
  const [shownUsersType, setShownUsersType] = useState("users");
  const handleShownUserType = (value: string) => setShownUsersType(value);

  const route = useRoute();
  const { name: route_name } = route;

  return (
    <View className="flex-1 items-center justify-between bg-white">
      {/* START OF FILTER PAGE TITLE */}
      <View className="h-2/6 w-full justify-start">
        <View className="flex-row  items-center w-full justify-between pr-3 pl-7">
          <Text className="font-bold">
            View {route_name === ROUTES.ADMIN_VIEW_BANNED_USERS ? "Banned" : "All"} {shownUsersType.charAt(0).toUpperCase() + shownUsersType.slice(1)}
          </Text>
          <SelectCountry
            style={adminStyles.dropdown}
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
        {/* SEARCH BAR */}
        <View className="items-center">
          <TextInput style={[styles.text_input, styles.admin_search_input]} className="placeholder:pl-3" placeholder="Search" />
        </View>
      </View>
      {/* END OF FILTER PAGE TITLE */}

      {/* START OF CARDS SECTION */}
      <ScrollView className="h-5/6 pt-5" horizontal={true}>
        <UserCardComponent />
        <UserCardComponent />
        <UserCardComponent />
      </ScrollView>
      {/* END OF CARDS SECTION */}
    </View>
  );
};

export default ViewUsersScreen;
