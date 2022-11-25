import { View, Text, TextInput } from "react-native";
import { AirbnbRating } from "react-native-ratings";
//internal imports
import SingleReviewStat from "./SingleReviewStat";
import styles from "../../../styles";
import { AllReviewsStatsProps } from "./types";
import expertStyles from "./expert.styles";
import { t } from "i18next";
import { COLORS } from "../../constants";

const AllReviewsStats: React.FC<AllReviewsStatsProps> = ({
  reviews_length,
  rating,
  textcolor_style,
  bgcolor_style,
  handleSearchReviewsChangeText,
  userIsSearchingReviews,
}) => {
  //translation
  const basedon_string = t("Based on");
  const reviews_string = t("Reviews");

  const five_avg = rating.totalOf5 > 0 ? rating.totalOf5 / reviews_length : 0;
  const four_avg = rating.totalOf4 > 0 ? rating.totalOf4 / reviews_length : 0;
  const three_avg = rating.totalOf3 > 0 ? rating.totalOf3 / reviews_length : 0;
  const two_avg = rating.totalOf2 > 0 ? rating.totalOf2 / reviews_length : 0;
  const one_avg = rating.totalOf1 > 0 ? rating.totalOf1 / reviews_length : 0;
  const rating_avg = rating.average ? rating.average : 0;

  return (
    // REVIEWS STATS
    <View style={bgcolor_style} className="w-5/6">
      <View className="h-40 justify-start">
        <View>
          <Text style={textcolor_style} className="text-center text-3xl font-bold">
            {rating_avg}.0
          </Text>
        </View>
        <AirbnbRating defaultRating={rating.average} isDisabled reviews={[""]} starContainerStyle={expertStyles.height_10px} />
        <Text style={textcolor_style} className="text-center mt-6">
          {basedon_string} {reviews_length} {reviews_string}
        </Text>
      </View>

      <SingleReviewStat key={1} progress={five_avg} rating={5} />
      <SingleReviewStat key={2} progress={four_avg} rating={4} />
      <SingleReviewStat key={3} progress={three_avg} rating={3} />
      <SingleReviewStat key={4} progress={two_avg} rating={2} />
      <SingleReviewStat key={5} progress={one_avg} rating={1} />

      {/* SEARCH BAR */}
      {reviews_length || userIsSearchingReviews ? (
        <View className="items-center mt-10 mb-5">
          <TextInput
            onChangeText={handleSearchReviewsChangeText}
            style={[styles.text_input, styles.search_input, textcolor_style && styles.border_grey]}
            className="placeholder:pl-3"
            placeholder="Search"
            placeholderTextColor={textcolor_style.color}
          />
        </View>
      ) : null}
    </View>
  );
};

export default AllReviewsStats;
