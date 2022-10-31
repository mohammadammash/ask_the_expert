import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { ExpertProfileScreen, NoviceBookAppointmentScreen, NoviceHomeScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
import {menuIcon} from "../Common/helpers/drawerNavigatorHelper";
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

const NoviceHomeStackNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={titleScreenOptions}>
      <Stack.Screen
        name={ROUTES.NOVICE_HOME}
        component={NoviceHomeScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name={ROUTES.NOVICE_BOOK_APPOINTMENT} component={NoviceBookAppointmentScreen} options={{ title: "Book" }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
    </Stack.Navigator>
  );
};

export default NoviceHomeStackNavigator;
