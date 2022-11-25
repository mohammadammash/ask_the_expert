import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";
//internal imports
import { ActivityIndicatorComponent, LeaderboardCardComponent } from "../../components";
import { useLeaderboardExperts } from "../../hooks/useUser";
import { COLORS, IMAGES } from "../../constants";
import { useEffect } from "react";
import { userType } from "../../hooks/UserContext";
import styles from "../../../styles";

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

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === 'dark' ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;

  //----------------
  //MAIN COMPONENT
  //LOADING DATA
  if (isLeaderboardExpertsDataLoading || isLeaderboardExpertsDataRefetching) {
    return (
      <ActivityIndicatorComponent color={textcolor_style.color} bgcolor_style={bgcolor_style}/>
    );
  }

  return (
    <View style={bgcolor_style} className="flex-1 items-center">
      <ScrollView contentContainerStyle={{ alignItems: "center" }} className="h-full w-full">
        {leaderboardExpertsData.data?.map((expert: userType, index: number) => (
          <LeaderboardCardComponent key={index} rank={index} expert={expert} textcolor_style={textcolor_style}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
