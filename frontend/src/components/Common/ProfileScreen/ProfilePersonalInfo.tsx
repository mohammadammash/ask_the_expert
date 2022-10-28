import { View, Text, Pressable, Switch, Button } from "react-native";
import { UserContext } from "../../../hooks/UserContext";
import { COLORS, USERTYPES, ROUTES } from "../../../constants";
import { useContext } from "react";
import styles from "../../../../styles";
//internal imports
import CalculateYearsOfExperienceHelper from "../helpers/calculateYearsOfExperienceHelper";
import { useNavigation } from "@react-navigation/native";
import AvailabilitySwitchButtonComponent from "./AvailabilitySwitchButton";
import ButtonsComponent from "./Buttons";

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
      </View>

      <ButtonsComponent />

      <AvailabilitySwitchButtonComponent />

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
