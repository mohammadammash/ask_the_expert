import { View, Text } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
//internal imports
import CalculateYearsOfExperienceHelper from "./helpers/calculateYearsOfExperienceHelper";

const ProfilePersonalInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality } = user;
  const yearsOfExp = CalculateYearsOfExperienceHelper(start_date);

  return (
    <View className="border-b w-full items-center pt-5 justify-start gap-3 h-1/4">
      <Text>
        {firstName} {lastName}
      </Text>
      <Text>{field}</Text>
      <Text>{speciality}</Text>
      <Text>WITH</Text>
      <Text>
        {yearsOfExp} of Experience
      </Text>
      <Text></Text>
    </View>
  );
};

export default ProfilePersonalInfo;
