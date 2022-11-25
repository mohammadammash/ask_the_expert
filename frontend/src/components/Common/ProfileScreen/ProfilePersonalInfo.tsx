import { t } from "i18next";
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
  textcolor_style,
}) => {
  //translation
  const with_string = t("with");
  const ofExperience_string = t("of Experience");
  const languages_string = t("languages");


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
        <Text style={textcolor_style} className="opacity-60 text-xs text-center">
          {t(field)}
        </Text>
      </View>
      <Text style={textcolor_style} className="text-sm font-bold">
        {t(speciality)}
      </Text>
      <Text style={textcolor_style} className="opacity-40 text-xs text-center uppercase">
        {with_string}
      </Text>
      <Text style={textcolor_style} className="opacity-80 text-xs font-medium">
        {yearsOfExperience} {ofExperience_string}
      </Text>
      <View className="w-full flex-row justify-around items-center">
        <Text style={textcolor_style} className="opacity-80 text-[8px] font-medium">
          <Text style={textcolor_style} className="font-bold capitalize">
            {languages_string}{" "}
          </Text>
          ({spoken_languages})
        </Text>
      </View>
    </View>
  );
};

export default ProfilePersonalInfo;
