import { View } from "react-native";
import { useState } from "react";
//internal imports
import { FilterPageTitleComponent } from "../../components";
import { USERS_TYPES_OPTIONS} from "../../constants";

const ViewBannedUsers = () => {
  const [shownUsersType, setShownUsersType] = useState("users");

  return (
    <View className="flex-1 items-center bg-white">
      <FilterPageTitleComponent userType={shownUsersType} options={USERS_TYPES_OPTIONS} set_userType={setShownUsersType}/>
    </View>
  );
};

export default ViewBannedUsers;
