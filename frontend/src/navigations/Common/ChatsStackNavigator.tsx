import { createStackNavigator } from "@react-navigation/stack";
//internal imports
import { ChatsScreen, SingleChatScreen } from "../../screens";
import { COLORS, ROUTES } from "../../constants";
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
const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.USER_CHATS} component={ChatsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={titleScreenOptions} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
