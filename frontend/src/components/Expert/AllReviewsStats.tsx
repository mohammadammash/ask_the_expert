import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { AirbnbRating } from "react-native-ratings";
//internal imports
import { COLORS } from "../../constants";
import { calculateReviewsStatsHelper } from "./helpers/calculateReviewsStatsHelper";
import { SingleReviewStat, ReviewCard } from "..";
import styles from "../../../styles";

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
    // REVIEWS STATS
    <View className="bg-white">
      <View>
        <Text className="text-center text-3xl font-bold">{rating.average}.0</Text>
        <AirbnbRating defaultRating={rating.average} isDisabled reviews={[""]} />
        <Text className="text-center mt-3">Based on {reviews.length} Reviews</Text>
      </View>

      <SingleReviewStat progress={rating.totalOf5 / reviews.length} rating={5} />
      <SingleReviewStat progress={rating.totalOf4 / reviews.length} rating={4} />
      <SingleReviewStat progress={rating.totalOf3 / reviews.length} rating={3} />
      <SingleReviewStat progress={rating.totalOf2 / reviews.length} rating={2} />
      <SingleReviewStat progress={rating.totalOf1 / reviews.length} rating={1} />

      {/* SEARCH BAR */}
      <View className="items-center mt-5">
        <TextInput style={[styles.text_input]} className="placeholder:pl-3" placeholder="Search" />
      </View>

      {/* ALL REVIEWS SHOW */}
      <View className="w-full items-center my-5">
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </View>
    </View>
  );
};

export default AllReviewsStats;
