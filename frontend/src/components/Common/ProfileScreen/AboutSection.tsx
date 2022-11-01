import { View, Text } from "react-native";
//internal imports
import { USERTYPES, COLORS } from "../../../constants";
import { AboutSectionProps } from "../types";


const AboutSection: React.FC<AboutSectionProps> = ({ user_type, about }) => {
  return (
    <View>
      {/* ABOUT SECTION */}
      <View style={user_type === USERTYPES.NOVICE && { backgroundColor: COLORS.white, marginTop: 10 }} className="items-center pt-3 pb-7 px-3">
        <Text style={{ color: COLORS.blue }} className="font-bold text-2xl pb-3">
          ABOUT
        </Text>
        <Text className="text-center">{about}</Text>
      </View>
    </View>
  );
};

export default AboutSection;
