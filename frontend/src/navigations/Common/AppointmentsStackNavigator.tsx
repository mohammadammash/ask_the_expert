import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { AppointmentsScreen, NoviceProfileScreen, ExpertProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";

const Stack = createStackNavigator();

const AppointmentsStackNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.USER_APPOINTMENTS}
        component={AppointmentsScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
