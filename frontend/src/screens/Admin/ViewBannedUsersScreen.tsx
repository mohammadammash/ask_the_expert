import { View, ScrollView, TextInput, Text } from "react-native";
import { useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import AlertAsync from "react-native-alert-async";
import { t } from "i18next";
//internal imports
import styles from "../../../styles";
import { COLORS } from "../../constants";
import { UserCardComponent, ActivityIndicatorComponent, FilterPageTitleComponent } from "../../components";
import { useBanOrUnBanUser, useGetAllUsersWithStatistics } from "../../hooks/useAdmin";
import { userType } from "../../hooks/UserContext";
import CalculateRatingAverageHelper from "./Helpers/CalculateRatingAverageHelper";

const ViewBannedUsersScreen = () => {
  const [shownUsers, setShownUsers] = useState<userType[]>([]);
  const [shownUsersType, setShownUsersType] = useState("users");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const cardbgcolor_style = colorScheme === "dark" ? styles.bg_grey : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;

  //Start of Handling filter users
  const handleShownUserType = (value: string) => {
    if (value !== "users") {
      const users = allUsersData.users.filter((user: userType) => user.user_type === value && user.isBanned);
      setShownUsers(users);
      setShownUsersType(value);
    } else {
      const allbanned_users = allUsersData.users.filter((user: userType) => user.isBanned);
      setShownUsers([...allbanned_users]);
      setShownUsersType(value);
    }
  };
  //End of Handling filter users

  //Start of Handling UnBan User Login
  const { mutate: mutateBanOrUnBanUser, isLoading: isLoadingmutateBanOrUnBanUser } = useBanOrUnBanUser();
  const handleonPressBanOrUnBanButton = async (user_id: string, firstName: string, isBanned: boolean) => {
    const data = { user_id, ban: false }; //Alwasy false since all users in this screen all already banned
    mutateBanOrUnBanUser(data);
  };
  // End of Handling UnBan User Login

  //Handle Search User Input
  const handleSearchUserChangeText = (text: string) => {
    if (!text) {
      let banned_users;
      if (shownUsersType !== "users")
        banned_users = allUsersData.users.filter((user: userType) => user.isBanned && user.user_type === shownUsersType);
      else banned_users = allUsersData.users.filter((user: userType) => user.isBanned);
      return setShownUsers([...banned_users]);
    }

    //Search only shown users filtered(all, only experts, only novices)
    const result = allUsersData.users.filter((user: userType) => {
      const { firstName, lastName, field, speciality, user_type, email, isBanned } = user;
      text = text.toLowerCase();
      if (
        (firstName.toLowerCase().includes(text) ||
          lastName.toLowerCase().includes(text) ||
          field.toLowerCase().includes(text) ||
          email.toLowerCase().includes(text) ||
          speciality.toLowerCase().includes(text)) &&
        isBanned &&
        (user_type === shownUsersType || shownUsersType === "users")
      )
        return user;
    });
    setShownUsers([...result]);
  };
  //End of Handle Search User Input

  //Handle SHOW BANNED USERS ON LOAD
  const { data: allUsersData, isLoading: isLoadingGetAllData } = useGetAllUsersWithStatistics();
  useEffect(() => {
    if (allUsersData) {
      const banned_users = allUsersData.users.filter((user: userType) => user.isBanned);
      setShownUsers([...banned_users]);
    }
  }, [allUsersData]);

  //------------------
  //------------------
  //LOADING DATA STATE
  if (isLoadingGetAllData || isLoadingmutateBanOrUnBanUser) {
    return <ActivityIndicatorComponent title="Users and Statistics are getting loaded" color={COLORS.dark} />;
  }
  //MAIN COMPONENT
  return (
    <View style={bgcolor_style} className="flex-1 items-center justify-between">
      {/* START OF FILTER PAGE TITLE */}
      <View className="h-1/6 w-full justify-start mb-10">
        <FilterPageTitleComponent
          cardbgcolor_style={cardbgcolor_style}
          textcolor_style={textcolor_style}
          shownUsersType={shownUsersType}
          handleShownUserType={handleShownUserType}
        />
        {/* SEARCH BAR */}
        <View className="items-center">
          <TextInput
            style={[styles.text_input, styles.admin_search_input, textcolor_style, colorScheme === "dark" && styles.border_grey]}
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
          <Text style={textcolor_style}>
            No Banned {shownUsersType.charAt(0).toUpperCase() + shownUsersType.slice(1)}
            {shownUsersType === "users" ? "" : "s"} Found
          </Text>
        </View>
      ) : (
        <ScrollView className="h-5/6 pt-5" horizontal={true}>
          {shownUsers.map((user: userType, index: number) => {
            const ratingAverage = CalculateRatingAverageHelper(user.reviews);
            return (
              <UserCardComponent
                key={index}
                reviews_average={ratingAverage}
                user={user}
                bgcolor_style={cardbgcolor_style}
                textcolor_style={textcolor_style}
                handlePress={handleonPressBanOrUnBanButton}
              />
            );
          })}
        </ScrollView>
      )}
      {/* END OF CARDS SECTION */}
    </View>
  );
};

export default ViewBannedUsersScreen;
