import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator, Text, Image } from "react-native";
//internal imports
import { LeaderboardCardComponent } from "../../components";
import { useLeaderboardExperts } from "../../hooks/useUser";
import { COLORS, IMAGES } from "../../constants";
import { useEffect } from "react";
import { userType } from "../../hooks/UserContext";

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const {
    isSuccess: isLeaderBoardExpertsDataSuccess,
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
      <View className="h-full items-center w-full">
        {leaderboardExpertsData.data?.map((expert: userType, index: number) => (
          <LeaderboardCardComponent key={index} rank={index} expert={expert} />
        ))}
      </View>
    </View>
  );
};

export default LeaderboardScreen;
