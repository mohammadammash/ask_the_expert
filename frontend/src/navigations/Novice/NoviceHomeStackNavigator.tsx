import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen, NoviceBookAppointmentScreen, NoviceHomeScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
const Stack = createStackNavigator();

const NoviceHomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.blue,
        },
        headerTintColor: COLORS.white,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name={ROUTES.NOVICE_HOME} component={NoviceHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={NoviceBookAppointmentScreen} options={{ title: "Book" }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
