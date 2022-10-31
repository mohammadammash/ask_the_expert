import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { AppointmentsScreen, NoviceProfileScreen, ExpertProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES, COLORS } from "../../constants";
import { menuIcon } from "./helpers/drawerNavigatorHelper";

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
  const navigation = useNavigation<any>();
  
  return (
    <Stack.Navigator screenOptions={titleScreenOptions}>
      <Stack.Screen
        name={ROUTES.USER_APPOINTMENTS}
        component={AppointmentsScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />
      <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen}/>
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator;
