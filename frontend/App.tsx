import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//internal imports
import { userInitialData, UserContext } from "./src/hooks/UserContext";
import { AuthStackNavigator, DrawerNavigator, AdminTabNavigator } from "./src/navigations";
import { USERTYPES } from "./src/constants";

export const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState(userInitialData);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user.user_type === USERTYPES.NOVICE || user.user_type === USERTYPES.EXPERT ? (
            <DrawerNavigator />
          ) : user.user_type === USERTYPES.ADMIN ? (
            <AdminTabNavigator />
          ) : (
            <AuthStackNavigator />
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
{
}
