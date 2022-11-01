import { View, Text, TextInput } from "react-native";
import { AirbnbRating } from "react-native-ratings";
//internal imports
import SingleReviewStat from "./SingleReviewStat";
import styles from "../../../styles";
import { AllReviewsStatsProps } from "./types";

const AllReviewsStats: React.FC<AllReviewsStatsProps> = ({
  reviews,
  rating,
}) => {

  return (
    // REVIEWS STATS
    <View className="bg-white">
      <View className="h-40 justify-start">
        <View className="">
          <Text className="text-center text-3xl font-bold">{rating.average}.0</Text>
        </View>
        <AirbnbRating defaultRating={rating.average} isDisabled reviews={[""]} starContainerStyle={{ height: 10 }} />
        <Text className="text-center mt-6">Based on {reviews.length} Reviews</Text>
      </View>

      <SingleReviewStat key={1} progress={rating.totalOf5 / reviews.length} rating={5} />
      <SingleReviewStat key={2} progress={rating.totalOf4 / reviews.length} rating={4} />
      <SingleReviewStat key={3} progress={rating.totalOf3 / reviews.length} rating={3} />
      <SingleReviewStat key={4} progress={rating.totalOf2 / reviews.length} rating={2} />
      <SingleReviewStat key={5} progress={rating.totalOf1 / reviews.length} rating={1} />

      {/* SEARCH BAR */}
      <View className="items-center mt-5">
        <TextInput style={[styles.text_input, styles.search_input]} className="placeholder:pl-3" placeholder="Search" />
      </View>

      
    </View>
  );
};

export default AllReviewsStats;
