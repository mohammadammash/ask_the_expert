import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
//internal imports
import styles from "../../../styles";
import { COLORS } from "../../constants";
import adminStyles from "./admin.styles";
import { USERS_TYPES_OPTIONS } from "../../constants";
import { UserCardComponent, ActivityIndicatorComponent } from "../../components";
import { useGetAllUsersWithStatistics } from "../../hooks/useAdmin";
import { userType } from "../../hooks/UserContext";
import CalculateRatingAverageHelper from "./Helpers/CalculateRatingAverageHelper";

const ViewUsersScreen = () => {
  const [shownUsers, setShownUsers] = useState<userType[]>([]);
  const [shownUsersType, setShownUsersType] = useState("users");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const cardbgcolor_style = colorScheme === "dark" ? styles.bg_grey : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;


  //Handling filter users
  const handleShownUserType = (value: string) => {
    if (value !== "users") {
      const users = allUsersData.users.filter((user: userType) => user.user_type === value);
      setShownUsers(users);
      setShownUsersType(value);
    } else {
      setShownUsers([...allUsersData.users]);
      setShownUsersType(value);
    }
  };

  //Handle Search User Input
  const handleSearchUserChangeText = (text: string) => {
    if (!text) return setShownUsers([...allUsersData.users]);
    //Search only shown users filtered(all, only experts, only novices)
    const result = allUsersData.users.filter((user: userType) => {
      const { firstName, lastName, field, speciality, user_type, email } = user;
      text = text.toLowerCase();
      if (
        (firstName.toLowerCase().includes(text) ||
          lastName.toLowerCase().includes(text) ||
          field.toLowerCase().includes(text) ||
          email.toLowerCase().includes(text) ||
          speciality.toLowerCase().includes(text)) &&
        (user_type === shownUsersType || shownUsersType === "users")
      )
        return user;
    });
    setShownUsers([...result]);
  };
  //End of Handle Search User Input

  //Handlie
  const { data: allUsersData, isLoading: isLoadingGetAllData } = useGetAllUsersWithStatistics();
  useEffect(() => {
    if (allUsersData) {
      setShownUsers([...allUsersData.users]);
    }
  }, [allUsersData]);

  //------------------
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
        {/* SEARCH BAR */}
        <View className="items-center">
          <TextInput
            style={[styles.text_input, styles.admin_search_input, textcolor_style]}
            className="placeholder:pl-3"
            placeholder="Search"
            placeholderTextColor={textcolor_style.color}
            onChangeText={handleSearchUserChangeText}
          />
        </View>
      </View>
      {/* END OF FILTER PAGE TITLE */}

      {/* START OF CARDS SECTION */}
      {shownUsers.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text>No {shownUsersType} Found</Text>
        </View>
      ) : (
        <ScrollView className="h-5/6 pt-5" horizontal={true}>
          {shownUsers.map((user: userType, index: number) => {
            const ratingAverage = CalculateRatingAverageHelper(user.reviews);
            return <UserCardComponent key={index} reviews_average={ratingAverage} user={user} bgcolor_style={cardbgcolor_style}/>;
          })}
        </ScrollView>
      )}
      {/* END OF CARDS SECTION */}
    </View>
  );
};

export default ViewUsersScreen;
