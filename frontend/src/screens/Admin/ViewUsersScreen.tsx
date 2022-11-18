import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
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
  const [shownUsers, setShownUsers] = useState<userType[]>([]);
  const [shownUsersType, setShownUsersType] = useState("users");
  const handleShownUserType = (value: string) => {
    let users = <userType[]>[];
    if (value !== "users") users = shownUsers.filter((user: userType) => user.user_type === value);
    setShownUsers([...users]);
  };

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.white_text : styles.dark_text;

  const { data: allUsersData, isLoading: isLoadingGetAllData } = useGetAllUsersWithStatistics();

  useEffect(() => {
    if (allUsersData) {
      const users = allUsersData.users.filter((user: userType) => user.isBanned);
      setShownUsers([...users]);
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
            View Banned All {shownUsersType.charAt(0).toUpperCase() + shownUsersType.slice(1)}
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
      {shownUsers.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text>No Banned {shownUsersType}</Text>
        </View>
      ) : (
        <ScrollView className="h-5/6 pt-5" horizontal={true}>
          {shownUsers.map((user: userType, index: number) => {
            const ratingAverage = CalculateRatingAverageHelper(user.reviews);
            return <UserCardComponent key={index} reviews_average={ratingAverage} user={user} />;
          })}
        </ScrollView>
      )}
      {/* END OF CARDS SECTION */}
    </View>
  );
};

export default ViewUsersScreen;
