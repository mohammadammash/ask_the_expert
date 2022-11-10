import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Switch, Platform } from "react-native";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import {
  AllReviewsStatsComponent,
  ProfileImageCardComponent,
  ProfilePersonalInfoComponent,
  AboutSectionComponent,
  AddReviewButtonSectionComponent,
  ButtonComponent,
  ReviewCardComponent,
} from "../../components";
import { COLORS, USERTYPES, ROUTES } from "../../constants";
import CalculateYearsOfExperienceHelper from "../Helpers/CalculateYearsOfExperienceHelper";
import { calculateReviewsStatsHelper } from "../Helpers/CalculateReviewsStatsHelper";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { profile_url, user_type, isAvailable, about, start_date, reviews } = user;

  //Button Info
  const handlePress = () => {
    navigation.navigate(ROUTES.USER_EDIT_PROFILE);
  };
  const title = "EDIT PROFILE";
  const button_style = "md";

  //Switch Button Info
  const handleSwitchPress = () => navigation.navigate(ROUTES.EXPERT_GO_ONLINE);

  //profile info
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);

  //REVIEW MODAL
  const modalRef = useRef();

  //allReviews Stats
  const handleCardClick = () => navigation.navigate(ROUTES.NOVICE_PROFILE);
  type ratingContent = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };
  const [rating, setRating] = useState({ average: 0, totalOf5: 0, totalOf4: 0, totalOf3: 0, totalOf2: 0, totalOf1: 0 });
  const handleRatingType = (rating: ratingContent) => setRating(rating);
  useEffect(() => {
    if (reviews) calculateReviewsStatsHelper(reviews, handleRatingType);
  }, [reviews]);

  //PARAMS
  const personalInfoData = { ...user, yearsOfExperience };
  const buttonData = { button_style, title, handlePress };
  const aboutData = { user_type, about };

  return (
    <ScrollView>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        <ButtonComponent {...buttonData} />

        <View className="w-full my-3">
          <View className="h-24 w-full items-center justify-evenly" style={styles.bg_grey}>
            <Text className="text-md font-bold">GO ONLINE</Text>
            <View className={`${Platform.OS === "ios" && "border"} rounded-2xl`}>
              <Switch
                trackColor={{ false: COLORS.white, true: COLORS.white }}
                thumbColor={isAvailable ? COLORS.blue : COLORS.white}
                onValueChange={handleSwitchPress}
                value={isAvailable}
              />
            </View>
          </View>
        </View>

        <AboutSectionComponent {...aboutData} />

        {/* REVIEWS TITLE */}
        <View style={styles.bg_grey} className="h-24 justify-center w-full font-bold mb-5">
          {user_type === USERTYPES.EXPERT ? (
            <Text style={styles.blue_text} className="font-bold text-2xl text-center">
              REVIEWS
            </Text>
          ) : (
            <>
              <AddReviewButtonSectionComponent modalRef={modalRef} />
            </>
          )}
        </View>

        {/* <AllReviewsStatsComponent rating={rating} reviews={reviews} /> */}

        {/* ALL REVIEWS SHOW */}
        {/* <View className="w-full items-center my-5">
          {reviews ? reviews.map((review, index) => <ReviewCardComponent key={index} review={review} handleCardClick={handleCardClick} />) : null}
        </View>
      */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
