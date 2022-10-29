import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ExpertProfileScreen, NoviceProfileScreen, ExpertGoOnlineScreen, EditProfileScreen, AdminProfileScreen, SingleChatScreen } from "../../screens";
import { ROUTES, USERTYPES } from "../../constants";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
const Stack = createStackNavigator();


const ProfileStackNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <Stack.Navigator>
      {user_type === USERTYPES.EXPERT && (
        <>
          <Stack.Screen name={ROUTES.EXPERT_PROFILE} component={ExpertProfileScreen} />
          <Stack.Screen name={ROUTES.EXPERT_GO_ONLINE} component={ExpertGoOnlineScreen} />
          <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />
          <Stack.Screen name={ROUTES.USER_SINGLE_CHAT} component={SingleChatScreen} />
        </>
      )}

      {user_type === USERTYPES.NOVICE && <Stack.Screen name={ROUTES.NOVICE_PROFILE} component={NoviceProfileScreen} />}

      {user_type === USERTYPES.ADMIN && <Stack.Screen name={ROUTES.ADMIN_PROFILE} component={AdminProfileScreen} />}

      <Stack.Screen name={ROUTES.USER_EDIT_PROFILE} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
