import { View, Image, Switch } from "react-native";
import { IMAGES, USERTYPES, ROUTES, COLORS } from "../../../constants";
import { UserContext } from "../../../hooks/UserContext";
import { useContext, useState } from "react";

import { useNavigation } from "@react-navigation/native";

const ProfileImageCard = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View className="h-1/4 w-full items-center justify-center">
      <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square rounded-full items-center w-2/3 my-2 h-3/4 border-8">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>
    </View>
  );
};

export default ProfileImageCard;
