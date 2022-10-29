import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
//internal imports
import { FilterPageTitleComponent, UserCardComponent } from "../../components";
import { USERS_TYPES_OPTIONS } from "../../constants";

const ViewBannedUsers = () => {
  const [shownUsersType, setShownUsersType] = useState("users");

  return (
    <View className="flex-1 items-center justify-between bg-white">
      <FilterPageTitleComponent userType={shownUsersType} options={USERS_TYPES_OPTIONS} set_userType={setShownUsersType} />

      <ScrollView className="h-5/6 w-full border" contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} horizontal={true}>
        <UserCardComponent />
        <UserCardComponent />
        <UserCardComponent />
      </ScrollView>
    </View>
  );
};

export default ViewBannedUsers;
