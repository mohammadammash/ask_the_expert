import { AirbnbRating } from "react-native-ratings";
import { View, Text, Image, TouchableOpacity } from "react-native";
//internal imports
import { IMAGES, ROUTES } from "../../constants";
import styles from "../../../styles";
import expertStyles from "./expert.styles";
import { ReviewCardProps } from "./types";

const ReviewCard: React.FC<ReviewCardProps> = ({ navigateToPage, review }) => {
  return (
    <TouchableOpacity onPress={() => navigateToPage(ROUTES.NOVICE_PROFILE)}>
      <View style={styles.bg_grey_opacity30} className="flex-row w-5/6 border-2 rounded-lg border-[#1FA6D1] items-center justify-around h-50 mb-5">
        <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-2/5 w-1/5 rounded-full items-center border-2 border-[#1FA6D1]">
          <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
        </View>

        <View className="w-4/6 pt-3">
          <Text className="text-base">FirstName LastName</Text>
          <Text className="text-sm opacity-50 mb-3">Field</Text>
          <Text className="w-full text-[11px]">{review.content}</Text>
          <View className="flex-row h-10 items-center justify-between">
            <AirbnbRating starContainerStyle={expertStyles.starsRatingRow} size={15} defaultRating={3} isDisabled reviews={[""]} />
            <Text className="text-[9px] opacity-75">10-9-2022</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewCard;
