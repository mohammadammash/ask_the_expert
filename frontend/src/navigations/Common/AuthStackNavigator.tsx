import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthLoginScreen, AuthRegisterScreen } from "../../screens";
import { COLORS, ROUTES } from "../../constants";
const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN} screenOptions={{ headerStyle: { backgroundColor: COLORS.blue }, headerBackTitle: " " }}>
      <Stack.Screen name={ROUTES.LOGIN} component={AuthLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.REGISTER} component={AuthRegisterScreen} options={{ title: "Sign Up" }} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;