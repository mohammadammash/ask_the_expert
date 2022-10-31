import { createStackNavigator } from "@react-navigation/stack";
//internal imports
import { AppointmentsScreen, NoviceProfileScreen, ExpertProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
const Stack = createStackNavigator();

const titleScreenOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const AppointmentsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.USER_APPOINTMENTS} component={AppointmentsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={titleScreenOptions} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={titleScreenOptions} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={titleScreenOptions} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
