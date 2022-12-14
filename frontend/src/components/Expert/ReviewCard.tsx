import { AirbnbRating } from "react-native-ratings";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "i18next";
//internal imports
import { IMAGES } from "../../constants";
import styles from "../../../styles";
import expertStyles from "./expert.styles";
import { ReviewCardProps } from "./types";

const ReviewCard: React.FC<ReviewCardProps> = ({ handleCardClick, review, currentOwner, handleDeleteOwnReview, textcolor_style }) => {
  const { firstName, lastName, profile_url, speciality } = review.novice_id;
  let { rating, content, createdAt } = review;
  createdAt = new Date(createdAt);
  const showed_date = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;

  return (
    <TouchableOpacity onPress={() => handleCardClick(review.novice_id)}>
      <View
        style={[styles.bg_grey_opacity30, styles.border_blue]}
        className="flex-row w-5/6 border-2 rounded-lg items-center justify-around h-50 mb-5"
      >
        <View style={styles.border_blue} className="avatar aspect-square max-w-1/5 max-h-1/5 h-2/5 w-1/5 rounded-full items-center border-2">
          <Image
            className="max-w-full max-h-full h-full w-full rounded-full"
            source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
          />
        </View>

        <View className="w-4/6 pt-3">
          <View className="w-full flex-row justify-between">
            <Text style={textcolor_style} className="text-base">
              {firstName[0].toUpperCase() +
                firstName.substring(1, firstName.length).toLowerCase() +
                " " +
                lastName[0].toUpperCase() +
                lastName.substring(1, lastName.length).toLowerCase()}{" "}
            </Text>
            {currentOwner ? (
              <Pressable onPress={() => handleDeleteOwnReview(review._id)}>
                <MaterialIcons name="delete-forever" size={22} color="red" />
              </Pressable>
            ) : null}
          </View>
          <Text style={textcolor_style} className="text-xs opacity-50 mb-3">
            {t(speciality)}
          </Text>
          <Text style={textcolor_style} className="w-full text-[11px]">
            {content}
          </Text>
          <View className="flex-row h-10 items-center justify-between">
            <AirbnbRating starContainerStyle={expertStyles.starsRatingRow} size={15} defaultRating={rating} isDisabled reviews={[""]} />
            <Text style={textcolor_style} className="text-[9px] opacity-75">
              {showed_date}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewCard;
