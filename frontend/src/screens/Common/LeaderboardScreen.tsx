import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
//internal imports
import { LeaderboardCardComponent } from "../../components";


const LeaderboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <Text className="text-slate-800">Leaderboard! 🎉</Text>
      <LeaderboardCardComponent rank={"Top"} />
      <LeaderboardCardComponent />
      <LeaderboardCardComponent />
    </View>
  );
};

export default LeaderboardScreen;
