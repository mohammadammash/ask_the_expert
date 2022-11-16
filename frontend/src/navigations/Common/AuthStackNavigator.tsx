import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthLoginScreen, AuthRegisterScreen } from "../../screens";
import { COLORS, ROUTES } from "../../constants";
import { t } from "i18next";
const Stack = createStackNavigator();


const AuthStackNavigator = () => {
  //translation

  const signup_title = t("Sign Up");

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{ headerStyle: { backgroundColor: COLORS.blue }, headerBackTitle: " ", headerTintColor: COLORS.white }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={AuthLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.REGISTER} component={AuthRegisterScreen} options={{ title: signup_title }} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
