import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import ProgressBar from "react-native-progress/Bar";

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

  const calculateTotalRating = (reviews): void => {
    let sum = 0;
    const length = reviews.length;
    let [totalOf5, totalOf4, totalOf3, totalOf2, totalOf1] = [0,0,0,0,0];
    for (let { rating } of reviews) {
      sum += rating;
      if(rating === 5) totalOf5++;
      else if(rating === 4) totalOf4++;
      else if(rating === 3) totalOf3++;
      else if(rating === 2) totalOf2++;
      else if (rating === 1) totalOf1++;
    }
    const average = Math.round(sum / length);
    setRating({ average, totalOf5, totalOf4, totalOf3, totalOf2, totalOf1 });
  };

  useEffect(() => {
    calculateTotalRating(reviews);
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
        <ProgressBar progress={rating.totalOf5 / reviews.length} width={100} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={4} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf4 / reviews.length} width={100} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={3} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf3 / reviews.length} width={100} />
      </View>

      <View className="flex-row  h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={2} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf2 / reviews.length} width={100} />
      </View>

      <View className="flex-row h-10 items-center justify-center">
        <AirbnbRating starContainerStyle={{ display: "flex", alignItems: "center", height: 80 }} size={20} defaultRating={1} isDisabled reviews={[""]} />
        <ProgressBar progress={rating.totalOf1 / reviews.length} width={100} />
      </View>
    </View>
  );
};

export default AllReviewsStats;
