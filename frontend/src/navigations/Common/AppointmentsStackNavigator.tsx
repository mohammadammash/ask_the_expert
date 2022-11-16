import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { AppointmentsScreen, NoviceProfileScreen, ExpertProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
import { t } from "i18next";

const Stack = createStackNavigator();

const AppointmentsStackNavigator = () => {
  const navigation = useNavigation<any>();
  //translation
  const profile_title = t("Profile");
  const messages_title = t("Messages");
  const myappointments_title = t("My Appointments");

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.USER_APPOINTMENTS}
        component={AppointmentsScreen}
        options={{
          title: myappointments_title,
          headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>,
        }}
      />
      <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} options={{ title: profile_title }} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: profile_title }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: messages_title }} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
