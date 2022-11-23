import { View, Text, Image } from "react-native";
import React from "react";
import { IMAGES } from "../../constants";
import commonStyles from "./common.styles";
import styles from "../../../styles";
import { t } from "i18next";
//internal imports"
import { LeaderboardCardProps } from "./types";

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ rank = 3, expert, textcolor_style }): JSX.Element => {
  //Conditional styling for second and third rank
  let rank_style = {};
  let rank_color = {};
  if (rank === 1) [rank_style, rank_color] = [commonStyles.grey_card, commonStyles.grey_text];
  else if (rank === 2) [rank_style, rank_color] = [commonStyles.bronze_card, commonStyles.bronze_text];

  //unpacking expert
  const { firstName, lastName, score, speciality, profile_url } = expert;

  //ALL CARDS DESIGN EXCEPT TOP 1
  if (rank === 0) {
    return (
      <View style={commonStyles.gold_card} className="w-3/4 relative justify-around items-center h-72 pt-3 my-5">
        <View className="avatar aspect-square max-w-2/5 max-h-2/5 h-2/5 w-2/5 rounded-full items-center border-4 border-[#E89923]">
          <Image
            className="max-w-full max-h-full h-full w-full rounded-full"
            source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
          />
        </View>

        <View className="absolute h-full">
          <Image className="top-1/3" source={IMAGES.topbadge} />
        </View>

        <View className="text-center w-full">
          <Text style={textcolor_style} className="font-bold text-center text-lg">
            {firstName[0].toUpperCase() +
              firstName.substring(1, firstName.length).toLowerCase() +
              " " +
              lastName[0].toUpperCase() +
              lastName.substring(1, lastName.length).toLowerCase()}{" "}
          </Text>
          <Text style={textcolor_style} className="text-sm opacity-50 text-center">
            {t(speciality)}
          </Text>
        </View>

        <View className="h-2/5 items-center justify-end pb-3">
          <Text style={commonStyles.gold_text} className="font-bold text-center text-4xl">
            #{rank + 1}
          </Text>
          <Text style={textcolor_style} className="font-semibold text-lg">
            {score} Pts
          </Text>
        </View>
      </View>
    );

    //CARD RANK 2,3, and else DESIGN
  } else {
    return (
      <View style={[commonStyles.leaderboard_card, rank_style]} className="flex-row w-5/6 rounded-lg mb-3 items-center justify-around h-24">
        <View
          className={`avatar aspect-square max-w-1/5 max-h-1/5 h-1/6 w-1/6 rounded-full items-center ml-2 ${
            rank === 1 ? "border-[#868686]" : rank === 2 ? "border-[#AC5E10]" : "border-2"
          } border-2`}
        >
          <Image
            className="max-w-full max-h-full h-full w-full rounded-full"
            source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
          />
        </View>

        <View className="h-full items-center justify-between pr-3 w-3/4 flex-row">
          <View className="gap-1">
            <Text style={textcolor_style} className="text-xs font-bold">
              {firstName[0].toUpperCase() +
                firstName.substring(1, firstName.length).toLowerCase() +
                " " +
                lastName[0].toUpperCase() +
                lastName.substring(1, lastName.length).toLowerCase()}{" "}
            </Text>
            <Text style={textcolor_style} className="text-[10px] opacity-50">
              {t(speciality)}
            </Text>
          </View>
          <View className="text-center">
            <Text style={textcolor_style} style={rank_color} className="text-center text-2xl font-bold">
              #{rank + 1}
            </Text>
            <Text style={textcolor_style} className="opacity-50 font-semibold text-base">
              {score} Pts
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default LeaderboardCard;
