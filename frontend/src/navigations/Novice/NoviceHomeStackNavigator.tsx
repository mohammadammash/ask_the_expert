import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { ExpertProfileScreen, NoviceBookAppointmentScreen, NoviceHomeScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
import { t } from "i18next";

const Stack = createStackNavigator();

const NoviceHomeStackNavigator = () => {
  //translation
  const home_title = t("Home");
  const book_title = t("Book");
  const profile_title = t("Profile");
  const messages_title = t("Messages");

  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.NOVICE_HOME}
        component={NoviceHomeScreen}
        options={{
          headerTitle: home_title,
          headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity>,
        }}
      />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: profile_title }} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={NoviceBookAppointmentScreen} options={{ title: book_title }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: messages_title }} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
