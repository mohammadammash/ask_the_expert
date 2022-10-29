import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
//internal imports
import { LeaderboardCardComponent } from "../../components";


const LeaderboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="h-full mt-10 items-center w-full">
        <LeaderboardCardComponent rank={"Top"} />
        <LeaderboardCardComponent />
        <LeaderboardCardComponent />
      </View>
    </View>
  );
};

export default LeaderboardScreen;
