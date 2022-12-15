import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
//internal imports
import { ChatsScreen, SingleChatScreen } from "../../screens";
import { ROUTES } from "../../constants";
import { menuIcon, stackScreenOptionsStyle } from "../Helpers/NavigatorsHelpers";
import { t } from "i18next";
const Stack = createStackNavigator();



const ChatsStackNavigator = () => {
  const navigation = useNavigation<any>();
  //translation
  const messages_title = t("Messages");
  const chat_title = t("My Chats")

  return (
    <Stack.Navigator screenOptions={stackScreenOptionsStyle}>
      <Stack.Screen
        name={ROUTES.USER_CHATS}
        component={ChatsScreen}
        options={{ title: chat_title, headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}>{menuIcon}</TouchableOpacity> }}
      />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} options={{ title: messages_title }} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
