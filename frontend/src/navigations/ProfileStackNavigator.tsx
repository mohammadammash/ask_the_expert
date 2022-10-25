import * as React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen,GoOnlineScreen, EditProfileScreen} from "../screens";
import { ROUTES } from "../constants";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} />
      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen name={ROUTES.EXPERT_GO_ONLINE} component={GoOnlineScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
