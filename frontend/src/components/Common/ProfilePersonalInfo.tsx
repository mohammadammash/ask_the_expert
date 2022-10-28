import { View, Text, Pressable, Switch } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { COLORS, USERTYPES, ROUTES } from "../../constants";
import { useContext } from "react";
import styles from "../../../styles";
//internal imports
import CalculateYearsOfExperienceHelper from "./helpers/calculateYearsOfExperienceHelper";
import { useNavigation } from "@react-navigation/native";

const ProfilePersonalInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality, user_type } = user;
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);
  const navigation = useNavigation<any>();

  return (
    <View className="w-full">
      <View className="w-full items-center justify-start gap-2">
        {/* PERSONAL INFO */}
        <View className="mb-2">
          <Text style={{ color: COLORS.blue }} className="font-bold text-2xl">
            {firstName} {lastName}
          </Text>
          <Text className="opacity-60 text-xs text-center">{field}</Text>
        </View>
        <Text style={{ color: COLORS.dark }} className="text-sm font-bold">
          {speciality}
        </Text>
        <Text className="opacity-40 text-xs text-center">WITH</Text>
        <Text className="opacity-80 text-xs font-medium">{yearsOfExperience} of Experience</Text>

        {/* EDIT PROFILE BUTTON  */}
        {user_type === USERTYPES.EXPERT && (
          <View>
            <Pressable className="my-2" style={styles.blue_button_md} onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)}>
              <Text className="text-white font-bold text-base">EDIT PROFILE</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* SWITCH AVAILABLE BUTTON */}
      {user.user_type === USERTYPES.EXPERT && (
        <View className="h-24 w-full items-center justify-center gap-2 mt-2" style={{ backgroundColor: COLORS.grey }}>
          <Text className="text-md">Go Online</Text>
          <View className="border rounded-2xl">
            <Switch
              trackColor={{ false: COLORS.white, true: COLORS.white }}
              thumbColor={!user.online ? COLORS.blue : COLORS.white}
              onValueChange={() => navigation.navigate(ROUTES.EXPERT_GO_ONLINE)}
              value={!user.online}
            />
          </View>
        </View>
      )}

      {/* ABOUT SECTION */}
      <View style={user.user_type === USERTYPES.NOVICE && { backgroundColor: COLORS.grey }} className="items-center pt-3 pb-7 px-3">
        <Text style={{ color: COLORS.blue }} className="font-bold text-2xl pb-3">
          ABOUT
        </Text>
        <Text className="text-center">{about}</Text>
      </View>
    </View>
  );
};

export default ProfilePersonalInfo;
