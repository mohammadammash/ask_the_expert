import { t } from "i18next";
import { View, Text } from "react-native";
import styles from "../../../../styles";
//internal imports
import { USERTYPES } from "../../../constants";
import commonStyles from "../common.styles";
import { AboutSectionProps } from "../types";

const AboutSection: React.FC<AboutSectionProps> = ({ user_type, about, textcolor_style }) => {
  //translation
  const about_title = t("About");

  let current_style;
  //different styling for novice about and expert about
  if (user_type === USERTYPES.NOVICE) current_style = commonStyles.novice_about;
  else current_style = commonStyles.expert_about;

  return (
    <View style={current_style}>
      <View className="w-4/5 items-center">
        <Text style={styles.blue_text} className="font-bold text-2xl pb-5 uppercase">
          {about_title}
        </Text>
        <Text style={textcolor_style} className="text-center capitalize">
          {about}
        </Text>
      </View>
    </View>
  );
};

export default AboutSection;
