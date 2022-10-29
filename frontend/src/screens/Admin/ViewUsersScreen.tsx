import { View, ScrollView } from "react-native";
import { useState } from "react";
//internal imports
import { FilterPageTitleComponent, UserCardComponent } from "../../components";
import { USERS_TYPES_OPTIONS } from "../../constants";

const ViewUsersScreen = () => {
  const [shownUsersType, setShownUsersType] = useState("users");

  return (
    <View className="flex-1 items-center justify-between bg-white">
      <FilterPageTitleComponent userType={shownUsersType} options={USERS_TYPES_OPTIONS} set_userType={setShownUsersType} />
    </View>
  );
};

export default ViewUsersScreen;
