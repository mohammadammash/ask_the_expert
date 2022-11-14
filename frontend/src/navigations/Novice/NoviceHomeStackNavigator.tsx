import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { ExpertProfileScreen, NoviceBookAppointmentScreen, NoviceHomeScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
import AppointmentsStackNavigator from "../Common/AppointmentsStackNavigator";
const Stack = createStackNavigator();

const NoviceHomeStackNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.NOVICE_HOME}
        component={NoviceHomeScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>, title: "Home" }}
      />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={NoviceBookAppointmentScreen} options={{ title: "Book" }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
      <Stack.Screen name={ROUTES.APPOINTMENTS_STACK} component={AppointmentsStackNavigator} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
