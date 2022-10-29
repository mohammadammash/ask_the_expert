import { View, Text, Image } from "react-native";
import React from "react";
import { IMAGES } from "../../constants";
//internal imports"

const LeaderboardCard = ({ rank = "notTop" }): JSX.Element => {
  //ALL CARDS DESIGN EXCEPT TOP 1
  if (rank === "Top") {
    return (
      <View className="w-4/6 rounded-lg border-4 relative justify-around items-center h-72 mb-10 border-[#E89923] pt-3">
        <View className="avatar aspect-square max-w-2/5 max-h-2/5 h-2/5 w-2/5 rounded-full items-center border-4 border-[#E89923]">
          <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
        </View>

        <View className="absolute h-full">
          <Image className="top-1/3" source={IMAGES.topbadge}/>
        </View>

        <View className="text-center w-full">
          <Text className="font-bold text-center text-lg">Mohammad THETOP</Text>
          <Text className="text-sm opacity-50 text-center">Senior Web Developer</Text>
        </View>

        <View className="h-2/5 items-center justify-end pb-3">
          <Text className="font-bold text-center text-3xl">#1</Text>
          <Text className="font-semibold text-lg">1.45k Pts</Text>
        </View>
      </View>
    );


    //CARD RANK 2,3, and else DESIGN
  } else {
    return (
      <View className="flex-row w-5/6 rounded-lg border-0.5 items-center justify-around h-24 mb-5">
        <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-2/5 w-1/5 rounded-full items-center ml-2 border-2">
          <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
        </View>

        <View className="h-full items-center justify-between pr-1 w-3/4 flex-row">
          <View className="gap-1">
            <Text className="text-sm font-bold">Mohammad Ammash</Text>
            <Text className="text-xs opacity-50">Senior Web Developer</Text>
          </View>
          <View className="text-center">
            <Text className="text-center text-2xl font-bold">#2</Text>
            <Text className="opacity-50 font-semibold text-base">1.35k Pts</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default LeaderboardCard;
