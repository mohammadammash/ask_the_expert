import { View, ScrollView } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
//internal imports
import { FilterPageTitleComponent, UserCardComponent } from "../../components";

const ViewUsersScreen = () => {
  const [shownUsersType, setShownUsersType] = useState("users");
  const handleShownUserType = (value: string) => setShownUsersType(value);

  const route = useRoute();
  const { name: route_name } = route;

  //params
  const data = {
    route_name,
    userType: shownUsersType,
    handleShownUserType,
  };

  return (
    <View className="flex-1 items-center justify-between bg-white">
      <FilterPageTitleComponent {...data} />

      <ScrollView className="h-5/6 pt-5" horizontal={true}>
        <UserCardComponent />
        <UserCardComponent />
        <UserCardComponent />
      </ScrollView>
    </View>
  );
};

export default ViewUsersScreen;
