import { View, Text } from "react-native";
import React from "react";

const LeaderboardCard = ({ rank = "notTop" }): JSX.Element => {
  //ALL CARDS DESIGN EXCEPT TOP 1
  if (rank === "notTop") {
    return (
      <View>
        <Text>NOTTOPCARD</Text>
      </View>
    );
  
  //CARD RANK 1 DESIGN
  } else {
    return (
      <View>
        <Text>TOPCARD</Text>
      </View>
    );
  }
};

export default LeaderboardCard;
