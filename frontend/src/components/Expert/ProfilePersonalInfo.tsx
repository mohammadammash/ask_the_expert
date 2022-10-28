import { View, Text } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { COLORS } from "../../constants";
import { useContext } from "react";
//internal imports
import CalculateYearsOfExperienceHelper from "./helpers/calculateYearsOfExperienceHelper";

const ProfilePersonalInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality } = user;
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);
  //hard Coded Reviews:
  const reviews = [
    { rating: 1, content: "Bruhh", created_at: Date.now() },
    { rating: 3, content: "Good Dude!1", created_at: Date.now() },
    { rating: 4, content: "Very Good!!", created_at: Date.now() },
    { rating: 5, content: "Wow!! Enormous info", created_at: Date.now() },
    { rating: 2, content: "Not Badd :(", created_at: Date.now() },
    { rating: 3, content: "Normal, can be better", created_at: Date.now() },
    { rating: 1, content: "Bad For me dude!", created_at: Date.now() },
  ];

  return (
    <>
      <View className="border-b w-full items-center py-5 justify-start gap-2 h-1/4">
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

      <View style={{ backgroundColor: COLORS.grey }} className="items-center border-b p-3">
        <Text style={{ color: COLORS.blue }} className="font-bold text-2xl pb-3">
          ABOUT
        </Text>
        <Text>{about}</Text>
      </View>
    </>
  );
};

export default ProfilePersonalInfo;
