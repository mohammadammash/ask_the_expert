import { View, Text } from "react-native";
import { UserContext } from "../../../hooks/UserContext";
import { useContext } from "react";
import { USERTYPES, COLORS } from "../../../constants";

const AboutSection = () => {
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality, user_type } = user;

  return (
    <View>
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

export default AboutSection;
