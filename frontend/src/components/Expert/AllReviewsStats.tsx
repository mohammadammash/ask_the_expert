import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

const AllReviewsStats = () => {
  //hard Coded Reviews:
  const reviews = [
    { rating: 5, content: "Bruhh", created_at: Date.now() },
    { rating: 1, content: "Good Dude!1", created_at: Date.now() },
    { rating: 4, content: "Very Good!!", created_at: Date.now() },
    { rating: 5, content: "Wow!! Enormous info", created_at: Date.now() },
    { rating: 2, content: "Not Badd :(", created_at: Date.now() },
    { rating: 3, content: "Normal, can be better", created_at: Date.now() },
    { rating: 1, content: "Bad For me dude!", created_at: Date.now() },
  ];

  const [rating, setRating] = useState({ average: 0, totalOfFive: 0, totalOfFour: 0, totalOfThree: 0, totalOfTwo: 0, totalOfOne: 0 });

  const calculateTotalRating = (reviews): void => {
    let sum = 0;
    const length = reviews.length;
    for (let { rating } of reviews) sum += rating;
    const avg = Math.round(sum / length);
    setRating((prevState) => ({...prevState, average: avg,}));
  };

  useEffect(() => {
    calculateTotalRating(reviews);
  }, []);

  return (
    <View className=" bg-white">
      <Text className="text-center text-3xl font-bold">{rating.average}.0</Text>
      <AirbnbRating defaultRating={rating.average} isDisabled reviews={[""]} />
      <Text className="text-center mt-3">Based on {reviews.length} Reviews</Text>
    </View>
  );
};

export default AllReviewsStats;
