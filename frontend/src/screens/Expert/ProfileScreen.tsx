import { useNavigation } from "@react-navigation/native";
import { RefreshControl, View, Text, ScrollView, Switch, Platform, Alert, ActivityIndicator } from "react-native";
import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { UserContext, userType } from "../../hooks/UserContext";
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
import { useGoOfflineExpert } from "../../hooks/useExpert";
import { useCurrentUser } from "../../hooks/useUser";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { profile_url, user_type, isAvailable, about, start_date, reviews } = user;

  //----------------------------------------------
  //START OF REFRESH PAGE UPDATE CURRENT USER DATA
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { data: getCurrentUserData, isLoading: isCurrentUserLoading, isSuccess: isCurrentUserUpdatedSuccess } = useCurrentUser({ enabled });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setEnabled(true); //call useCurrentUser //update current user
  }, []);

  useEffect(() => {
    //userData is reRetrieved and loading stopped => update Current user Data
    if (isCurrentUserUpdatedSuccess && !isCurrentUserLoading) {
      setUser({ ...getCurrentUserData });
      setRefreshing(false);
      setEnabled(false);
    }
  }, [getCurrentUserData]);
  //END OF REFRESH PAGE UPDATE CURRENT USER DATA
  //----------------------------------------------

  //-----------------------------------
  //START OF GO OFFLINE POST API SUBMIT
  const {
    data: mutateGoOfflineExpertData,
    mutate: mutateGoOfflineExpert,
    isLoading: mutateGoOfflineExpertIsLoading,
    isSuccess: mutateGoOfflineExpertIsSuccess,
  } = useGoOfflineExpert();

  //if finished loading and success:
  useEffect(() => {
    if (mutateGoOfflineExpertIsSuccess) {
      setUser({ ...user, isAvailable: false });
      //the data is made of novices_devices_token to send notifications to that appointments are canceled with this currentUser
      alert(JSON.stringify(mutateGoOfflineExpertData, null, 2));
    }
  }, [mutateGoOfflineExpertIsSuccess]);

  //Switch Button Info
  const handleSwitchPress = () => {
    //if user is offline send him/her to goOnline form page
    if (!isAvailable) return navigation.navigate(ROUTES.EXPERT_GO_ONLINE);
    //if user is currently online => show popup to make sure that user want to go offine and remove all remaining appointments if exists
    Alert.alert("Go Offline", "\nAll appointments reserved will be automatically canceled and this action cannot be changed?\n\n Are you sure?", [
      {
        text: "Cancel",
        style: "destructive",
      },
      { text: "Submit", onPress: () => mutateGoOfflineExpert(), style: "default" },
    ]);
  };
  //END OF GO OFFLINE POST API SUBMIT
  //-----------------------------------

  //Button Info
  const handlePress = () => {
    navigation.navigate(ROUTES.USER_EDIT_PROFILE);
  };
  const title = "EDIT PROFILE";
  const button_style = "md";

  //profile info
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);

  //REVIEW MODAL
  const modalRef = useRef();

  //allReviews Stats
  const handleCardClick = (novice_user: userType) => navigation.navigate(ROUTES.NOVICE_PROFILE, { novice_user });
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
  const reviewsStatsData = { reviews_length: reviews?.length || 0, rating };

  //----------------
  // MAIN COMPONENT
  //if loading submit
  if (mutateGoOfflineExpertIsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        <View className="mt-3">
          <ButtonComponent {...buttonData} />
        </View>

        {/* SET AVAILBILITY SWITCH SECTION */}
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
            <AddReviewButtonSectionComponent modalRef={modalRef} />
          )}
        </View>

        {/* REVIEWS SECTION */}
        <AllReviewsStatsComponent {...reviewsStatsData} />

        <View className="w-full items-center my-5">
          {reviews?.map((review, index) => (
            <ReviewCardComponent key={index} review={review} handleCardClick={handleCardClick} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
