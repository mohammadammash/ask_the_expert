import { View } from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import ProgressBar from "react-native-progress/Bar";
import { COLORS } from "../../constants";
import { ReviewSingleChatProps } from "./types";
import expertStyles from "./expert.styles";

const ReviewSingleStat: React.FC<ReviewSingleChatProps> = ({ progress, rating }) => {
  return (
    <View className="flex-row h-10 items-center justify-center">
      <AirbnbRating starContainerStyle={expertStyles.starsRatingRow} size={20} defaultRating={rating} isDisabled reviews={[""]} />
      <ProgressBar progress={progress} width={140} color={COLORS.blue} />
    </View>
  );
};

export default ReviewSingleStat;
