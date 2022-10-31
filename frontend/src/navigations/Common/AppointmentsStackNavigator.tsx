import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppointmentsScreen, NoviceProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
const Stack = createStackNavigator();

const AppointmentsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.USER_APPOINTMENTS} component={AppointmentsScreen} options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
