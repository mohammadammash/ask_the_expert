import { View, Text } from "react-native";
import styles from "../../../../styles";
//internal imports
import { COLORS } from "../../../constants";
import { ProfilePersonalInfoProps } from "../types";

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({ firstName, lastName, field, speciality, yearsOfExperience, spoken_languages }) => {
  return (
    <View className="w-full">
      <View className="w-full items-center justify-start gap-2">
        {/* PERSONAL INFO */}
        <View className="mb-2">
          <Text style={styles.blue_text} className="font-bold text-2xl">
            {firstName} {lastName}
          </Text>
          <Text className="opacity-60 text-xs text-center">{field}</Text>
        </View>
        <Text style={styles.dark_text} className="text-sm font-bold">
          {speciality}
        </Text>
        <Text className="opacity-40 text-xs text-center">WITH</Text>
        <Text className="opacity-80 text-xs font-medium">{yearsOfExperience} of Experience</Text>
        <Text className="opacity-80 text-[10px] font-medium bg-red">({spoken_languages})</Text>
      </View>
    </View>
  );
};

export default ProfilePersonalInfo;
