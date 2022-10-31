import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
//internal imports
import { ChatsScreen, SingleChatScreen } from "../../screens";
import { COLORS, ROUTES } from "../../constants";
const Stack = createStackNavigator();

const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.USER_CHATS} component={ChatsScreen} screenOptions={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
