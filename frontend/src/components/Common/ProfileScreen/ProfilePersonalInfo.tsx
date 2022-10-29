import { View, Text, Pressable, Switch, Button } from "react-native";
import { UserContext } from "../../../hooks/UserContext";
import { useContext } from "react";
import { COLORS,  } from "../../../constants";
import styles from "../../../../styles";
//internal imports
import CalculateYearsOfExperienceHelper from "../helpers/calculateYearsOfExperienceHelper";
import { useNavigation } from "@react-navigation/native";
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
      </View>
  );
};

export default ProfilePersonalInfo;
