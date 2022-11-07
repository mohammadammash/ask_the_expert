import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { ChatsScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
const Stack = createStackNavigator();

const ChatsStackNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.USER_CHATS}
        component={ChatsScreen}
        options={{ headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: "Messages" }} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
