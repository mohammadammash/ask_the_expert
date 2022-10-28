import { View, Text } from 'react-native'
import React from 'react'
import { AirbnbRating } from "react-native-ratings";
import ProgressBar from "react-native-progress/Bar";
import { COLORS } from '../../constants';

interface ReviewSingleChatProps {
  progress: number,
  rating: number,
}

const ReviewSingleStat : React.FC<ReviewSingleChatProps> = ({progress, rating}) => {
  return (
    <View className="flex-row h-10 items-center justify-center">
      <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={rating} isDisabled reviews={[""]} />
      <ProgressBar progress={progress} width={140} color={COLORS.blue} />
    </View>
  );
}

export default ReviewSingleStat