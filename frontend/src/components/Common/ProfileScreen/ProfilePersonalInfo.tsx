import { View, Text } from "react-native";
import styles from "../../../../styles";
//internal imports
import { ProfilePersonalInfoProps } from "../types";

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({
  firstName,
  lastName,
  field,
  speciality,
  yearsOfExperience,
  spoken_languages,
  score,
}) => {
  return (
      <View className="w-full items-center justify-start gap-2">
        {/* PERSONAL INFO */}
        <Text style={styles.orange_text} className="text-[10px] font-bold">
          {score && score >= 0 ? "Score: " + score : ""}
        </Text>
        <View className="mb-2 items-center">
          <Text style={styles.blue_text} className="font-bold text-2xl mb-1">
            {firstName[0].toUpperCase() +
              firstName.substring(1, firstName.length).toLowerCase() +
              " " +
              lastName[0].toUpperCase() +
              lastName.substring(1, lastName.length).toLowerCase()}{" "}
          </Text>
          <Text className="opacity-60 text-xs text-center">{field}</Text>
        </View>
        <Text style={styles.dark_text} className="text-sm font-bold">
          {speciality}
        </Text>
        <Text className="opacity-40 text-xs text-center">WITH</Text>
        <Text className="opacity-80 text-xs font-medium">{yearsOfExperience} of Experience</Text>
        <View className="w-full flex-row justify-around items-center">
          <Text className="opacity-80 text-[8px] font-medium bg-red">
            <Text className="font-bold">Languages: </Text>({spoken_languages})
          </Text>
        </View>
      </View>
  );
};

export default ProfilePersonalInfo;
