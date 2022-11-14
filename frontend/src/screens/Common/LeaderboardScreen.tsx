import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator, ScrollView } from "react-native";
//internal imports
import { LeaderboardCardComponent } from "../../components";
import { useLeaderboardExperts } from "../../hooks/useUser";
import { COLORS, IMAGES } from "../../constants";
import { useEffect } from "react";
import { userType } from "../../hooks/UserContext";

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const {
    data: leaderboardExpertsData,
    isLoading: isLeaderboardExpertsDataLoading,
    refetch: refetchLeaderboardExpertData,
    isRefetching: isLeaderboardExpertsDataRefetching,
  } = useLeaderboardExperts();

  useEffect(() => {
    refetchLeaderboardExpertData;
  }, []);

  //----------------
  //MAIN COMPONENT
  //LOADING DATA
  if (isLeaderboardExpertsDataLoading || isLeaderboardExpertsDataRefetching) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center" }} className="h-full w-full">
        {leaderboardExpertsData.data?.map((expert: userType, index: number) => (
          <LeaderboardCardComponent key={index} rank={index} expert={expert} />
        ))}
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
