import { View, Image, Switch } from "react-native";
import { IMAGES, USERTYPES, ROUTES, COLORS } from "../../constants";
import { UserContext } from "../../hooks/UserContext";
import { useContext, useState } from "react";

import { useNavigation } from "@react-navigation/native";

const ProfileImageCard = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);

  const NavigateToScreen = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={{backgroundColor: COLORS.grey}} className="border h-1/2 w-full items-center justify-center">
      <View className="avatar aspect-square rounded-full items-center w-2/3 mb-2 h-2/3 border-2">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      {/* IF the usertype is expert then he/she is the current profile owner */}
      {user.user_type === USERTYPES.EXPERT && (
        <View className="border rounded-2xl">
          <Switch
            trackColor={{ false: COLORS.white, true: COLORS.white, }}
            thumbColor={user.online ? COLORS.blue : COLORS.white}
            onValueChange={() => NavigateToScreen(ROUTES.EXPERT_GO_ONLINE)}
            value={user.online}
          />
        </View>
      )}

    </View>
  );
};

export default ProfileImageCard;
