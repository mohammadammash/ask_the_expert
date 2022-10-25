import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen, BookAppointmentScreen, HomeScreen } from "../../screens";
import { ROUTES } from "../../constants";
const Stack = createStackNavigator();

const NoviceHomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.NOVICE_HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={BookAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
