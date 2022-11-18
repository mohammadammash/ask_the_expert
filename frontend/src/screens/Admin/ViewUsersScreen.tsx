import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
//internal imports
import styles from "../../../styles";
import { ROUTES, COLORS } from "../../constants";
import adminStyles from "./admin.styles";
import { USERS_TYPES_OPTIONS } from "../../constants";
import { UserCardComponent, ActivityIndicatorComponent } from "../../components";
import { useGetAllUsersWithStatistics } from "../../hooks/useAdmin";
import { userType } from "../../hooks/UserContext";
import CalculateRatingAverageHelper from "./Helpers/CalculateRatingAverageHelper";

const ViewUsersScreen = () => {
  const [shownUsersType, setShownUsersType] = useState("users");
  const handleShownUserType = (value: string) => setShownUsersType(value);

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.white_text : styles.dark_text;

  const route = useRoute();
  const { name: route_name } = route;

  const { data: allUsersData, isLoading: isLoadingGetAllData } = useGetAllUsersWithStatistics();

  useEffect(() => {
    if (allUsersData) {
    }
  }, [allUsersData]);

  //------------------
  //LOADING DATA STATE
  if (isLoadingGetAllData) {
    return <ActivityIndicatorComponent title="Users and Statistics are getting loaded" color={COLORS.dark} />;
  }

  //MAIN COMPONENT
  return (
    <View style={bgcolor_style} className="flex-1 items-center justify-between">
      {/* START OF FILTER PAGE TITLE */}
      <View className="h-1/6 w-full justify-start mb-10">
        <View className="flex-row  items-center w-full justify-between pr-3 pl-7">
          <Text style={textcolor_style} className="font-bold">
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
          <TextInput style={[styles.text_input, styles.admin_search_input, textcolor_style]} className="placeholder:pl-3" placeholder="Search" />
        </View>
      </View>
      {/* END OF FILTER PAGE TITLE */}

      {/* START OF CARDS SECTION */}
      <ScrollView className="h-5/6 pt-5" horizontal={true}>
        {allUsersData.users.map((user: userType, index: number) => {
          const ratingAverage = CalculateRatingAverageHelper(user.reviews);
          return shownUsersType === "users" || shownUsersType === user.user_type ? (
            <UserCardComponent key={index} reviews_average={ratingAverage} user={user} />
          ) : null;
        })}
      </ScrollView>
      {/* END OF CARDS SECTION */}
    </View>
  );
};

export default ViewUsersScreen;
