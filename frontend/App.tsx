import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, ExpertDrawerNavigator } from "./src/navigations";

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator/> */}
      <ExpertDrawerNavigator />
    </NavigationContainer>
  );
}
