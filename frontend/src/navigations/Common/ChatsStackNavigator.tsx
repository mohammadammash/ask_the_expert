import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
//internal imports
import { ChatsScreen, SingleChatScreen } from "../../screens";
import { COLORS, ROUTES } from "../../constants";
import { menuIcon } from "./helpers/drawerNavigatorHelper";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

const titleScreenOptions = () => ({
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: COLORS.blue,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: "bold",
  },
});

const ChatsStackNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={titleScreenOptions}>
      <Stack.Screen
        name={ROUTES.USER_CHATS}
        component={ChatsScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
