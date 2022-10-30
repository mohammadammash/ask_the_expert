import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen, NoviceBookAppointmentScreen, NoviceHomeScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
const Stack = createStackNavigator();

const NoviceHomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.NOVICE_HOME} component={NoviceHomeScreen} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={NoviceBookAppointmentScreen} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
