import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthLoginScreen, AuthRegisterScreen } from "../../screens";
import { ROUTES } from "../../constants";
const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={AuthLoginScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={AuthRegisterScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;