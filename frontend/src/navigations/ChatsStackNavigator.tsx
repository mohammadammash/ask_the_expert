import * as React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen, SingleChatScreen } from "../screens";
import { ROUTES } from "../constants";
const Stack = createStackNavigator();

const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.USER_CHATS} component={ChatsScreen} />
      <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatsStackNavigator;
