import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import ProgressBar from "react-native-progress/Bar";
//internal imports
import { COLORS } from "../../constants";
import { calculateReviewsStatsHelper } from "./helpers/calculateReviewsStatsHelper";

const AllReviewsStats = () => {
  //hard Coded Reviews:
  const reviews = [
    { rating: 5, content: "Bruhh", created_at: Date.now() },
    { rating: 1, content: "Good Dude!1", created_at: Date.now() },
    { rating: 4, content: "Very Good!!", created_at: Date.now() },
    { rating: 5, content: "Wow!! Enormous info", created_at: Date.now() },
    { rating: 3, content: "Not Badd :(", created_at: Date.now() },
    { rating: 3, content: "Normal, can be better", created_at: Date.now() },
    { rating: 3, content: "Bad For me dude!", created_at: Date.now() },
  ];

  const [rating, setRating] = useState({ average: 0, totalOf5: 0, totalOf4: 0, totalOf3: 0, totalOf2: 0, totalOf1: 0 });

  useEffect(() => {
    calculateReviewsStatsHelper(reviews, setRating);
  }, []);

  return (
    <View className="bg-white">
      <View>
        <Text className="text-center text-3xl font-bold">{rating.average}.0</Text>
        <AirbnbRating defaultRating={rating.average} isDisabled reviews={[""]} />
        <Text className="text-center mt-3">Based on {reviews.length} Reviews</Text>
      </View>

      <View className="flex-row h-10 mt-4 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={5} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf5 / reviews.length} width={140} color={COLORS.blue} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={4} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf4 / reviews.length} width={140} color={COLORS.blue} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={3} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf3 / reviews.length} width={140} color={COLORS.blue} />
      </View>

      <View className="flex-row  h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={2} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf2 / reviews.length} width={140} color={COLORS.blue} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={1} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf1 / reviews.length} width={140} color={COLORS.blue} />
      </View>
    </View>
  );
};

export default AllReviewsStats;
