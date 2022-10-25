import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen, NoviceProfileScreen, GoOnlineScreen, EditProfileScreen } from "../../screens";
import { ROUTES, USERTYPES } from "../../constants";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const { id, user_type } = user;
  const shownuser_id = 22;

  return (
    <Stack.Navigator>
      {user_type === USERTYPES.EXPERT && (
        <>
          <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} />
          <Stack.Screen name={ROUTES.EXPERT_GO_ONLINE} component={GoOnlineScreen} />
        </>
      )}

      {user_type === USERTYPES.NOVICE && shownuser_id === id && <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />}

      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
