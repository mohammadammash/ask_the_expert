import { useNavigation } from "@react-navigation/native";
import { RefreshControl, View, Text, ScrollView, Switch, Platform, Alert, StyleSheet } from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { reviewsType, userType, useUserContext } from "../../hooks/UserContext";
import RBSheet from "react-native-raw-bottom-sheet";
import { useColorScheme } from "nativewind";
//internal imports
import {
  AllReviewsStatsComponent,
  ProfileImageCardComponent,
  ProfilePersonalInfoComponent,
  AboutSectionComponent,
  AddReviewModalFormComponent,
  ButtonComponent,
  ReviewCardComponent,
  ActivityIndicatorComponent,
} from "../../components";
import { COLORS, ROUTES } from "../../constants";
import CalculateYearsOfExperienceHelper from "../Helpers/CalculateYearsOfExperienceHelper";
import { calculateReviewsStatsHelper } from "../Helpers/CalculateReviewsStatsHelper";
import styles from "../../../styles";
import { useGoOfflineExpert } from "../../hooks/useExpert";
import { useCurrentUser } from "../../hooks/useUser";
import { useAddReview, useDeleteReview } from "../../hooks/useNovice";
import { t } from "i18next";

const ProfileScreen = ({ route }: { route: any }) => {
  //translation
  const reviews_string = t("REVIEWS");
  const rating_title = t("Choose the time you will be available by, and the time of each meeting");
  const expertisnowoffline_string = t("EXPERT IS CURRENTLY OFFLINE!");
  const expertisnowonline_string = t("EXPERT IS CURRENTLY ONLINE");
  const gooffline_string = t("GO OFFLINE");
  const goonline_string = t("GO ONLINE");
  const submit_string = t("Submit");
  const cancel_string = t("Cancel");
  const review_string = t("Review");
  const assure_string = t("Are you sure");
  const allappointments_string = t("All appointments reserved will be automatically canceled and this action cannot be changed");
  const editprofile_string = t("EDIT PROFILE");
  const assuresubmitreview_string = t("Are you sure you want submit your review");
  const book_string = t("BOOK");
  const message_string = t("MESSAGE");
  const block_string = t("BLOCK");
  const addreview_string = t("ADD REVIEW");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const activityicon_color = colorScheme === "dark" ? COLORS.white : COLORS.dark;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.white_text;

  const navigation = useNavigation<any>();
  let { user, setUser } = useUserContext();
  const currentUser_id = user._id;
  const currentUser = { ...user };

  let shown_expert;
  //Expert user is accessed when novice click on close expert to view Profile
  if (route.params) shown_expert = route.params.shown_expert;
  //If novice visiting expert_profile show expert data to novice as main user
  if (shown_expert) user = { ...shown_expert };
  const { profile_url, user_type, isAvailable, about, start_date, reviews } = user;
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);
  const { mutate: mutateAddReview, data: mutateAddReviewData, isLoading: isLoadingMutateAddReviewData } = useAddReview();
  const { mutate: mutateDeleteReview, data: mutateDeleteReviewData, isLoading: isLoadingMutateDeleteReviewData } = useDeleteReview();

  const {
    data: mutateGoOfflineExpertData,
    mutate: mutateGoOfflineExpert,
    isLoading: isLoadingMutateGoOfflineExpert,
    isSuccess: mutateGoOfflineExpertIsSuccess,
  } = useGoOfflineExpert();

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
    if (!isCurrentUserLoading && isCurrentUserUpdatedSuccess) {
      setUser({ ...getCurrentUserData });
      setRefreshing(false);
      setEnabled(false);
    }
  }, [getCurrentUserData]);
  //END OF REFRESH PAGE UPDATE CURRENT USER DATA
  //----------------------------------------------

  //-----------------------------------
  //START OF GO OFFLINE POST API SUBMIT
  //if finished loading and success:
  useEffect(() => {
    if (mutateGoOfflineExpertIsSuccess) {
      setUser({ ...user, isAvailable: false });
    }
  }, [mutateGoOfflineExpertIsSuccess]);

  //Switch Button Info
  const handleSwitchPress = () => {
    //if user is offline send him/her to goOnline form page
    if (!isAvailable) return navigation.navigate(ROUTES.EXPERT_GO_ONLINE);
    //if user is currently online => show popup to make sure that user want to go offine and remove all remaining appointments if exists
    Alert.alert(gooffline_string, `\n ${allappointments_string}?\n\n ${assure_string}?`, [
      {
        text: cancel_string,
        style: "destructive",
      },
      { text: submit_string, onPress: () => mutateGoOfflineExpert(), style: "default" },
    ]);
  };
  //END OF GO OFFLINE POST API SUBMIT
  //-----------------------------------

  //-----------------------------------------------------------------
  //START OF HANDLING BUTTONS CLICKED //For Current User Profile
  const disabled = shown_expert?.isAvailable ? false : true;
  const route_name = ROUTES.USER_EDIT_PROFILE;
  const title = editprofile_string.toUpperCase();
  const button_style = `${user._id === currentUser_id ? "md" : "sm"}`;

  const handlePress = (route_name: string) => {
    if (route_name === ROUTES.NOVICE_BOOK_APPOINTMENT) {
      const appointments_groups = user.appointments_groups;
      navigation.navigate(ROUTES.NOVICE_BOOK_APPOINTMENT, { appointments_groups });
    } else if (route_name === "review") modalRef.current?.open();
    else if (route_name === ROUTES.USER_EDIT_PROFILE) navigation.navigate(route_name);
    else navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data: user });
  };
  //END OF HANDLING BUTTONS CLICKED //For Current User Profile
  //-----------------------------------------------------------------

  //---------------------------------
  //START OF REVIEWS SECTION HANDLING
  const modalRef = useRef();
  const [shownReviews, setShownReviews] = useState<reviewsType[]>([]);
  const [alreadyAddedReview, setAlreadyAddedReview] = useState(false); //to check if visiting user placed a review on shown expert profile or not
  const [removedReviewId, setRemovedReviewId] = useState("");
  type ratingContent = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number }; //reviews stats
  const [rating, setRating] = useState({ average: 0, totalOf5: 0, totalOf4: 0, totalOf3: 0, totalOf2: 0, totalOf1: 0 });

  const handleCardClick = (novice_user: userType) => {
    //if current expert profile allow him/her to view reviwers profiles
    if (user._id === currentUser_id) navigation.navigate(ROUTES.NOVICE_PROFILE, { novice_user });
  };

  useEffect(() => {
    if (shownReviews.length === 0 && reviews) setShownReviews([...reviews]);
  }, []);

  const handleRatingType = (rating: ratingContent) => setRating(rating);

  useEffect(() => {
    calculateReviewsStatsHelper(shownReviews, handleRatingType);
  }, [shownReviews]);

  const handleRatingSubmit = (values: { rating: number; content: string }) => {
    const submitReview = () => {
      const data = { ...values, expert_id: user._id };
      mutateAddReview(data);
    };
    Alert.alert(submit_string + review_string, `\n${assuresubmitreview_string}?`, [
      {
        text: cancel_string,
        style: "destructive",
      },
      { text: submit_string, onPress: submitReview, style: "default" },
    ]);
  };

  const handleDeleteOwnReview = (review_id: string) => {
    setRemovedReviewId(review_id);
    mutateDeleteReview(user._id);
  };

  useEffect(() => {
    if (mutateDeleteReviewData && alreadyAddedReview && removedReviewId) {
      const new_reviews = shownReviews.filter((rev) => rev._id !== removedReviewId);
      setShownReviews([...new_reviews]);
      setAlreadyAddedReview(false);
      setRemovedReviewId("");
    }
  }, [mutateDeleteReviewData]);

  useEffect(() => {
    if (mutateAddReviewData && !alreadyAddedReview) {
      const new_review = mutateAddReviewData.data;
      new_review.novice_id = { ...currentUser }; //manual populate
      setShownReviews((prev) => [new_review, ...prev]);
      setAlreadyAddedReview(true);
    }
  }, [mutateAddReviewData]);
  //END OF REVIEWS SECTION HANDLING
  //---------------------------------

  //---------------------------------
  //START OF HANDLE SEARCH REVIEWS
  const [userIsSearchingReviews, setUserIsSearchingReviews] = useState(false);
  const handleSearchReviewsChangeText = (text: string) => {
    if (!text) {
      setUserIsSearchingReviews(false);
      return setShownReviews([...user.reviews]);
    }
    setUserIsSearchingReviews(true);
    const result = user.reviews?.filter((review: reviewsType) => {
      const { firstName, lastName, field, speciality } = review.novice_id; //populated id
      const { rating, content } = review;
      text = text.toLowerCase();
      if (
        firstName.toLowerCase().includes(text) ||
        lastName.toLowerCase().includes(text) ||
        field.toLowerCase().includes(text) ||
        content.toLowerCase().includes(text) ||
        rating === parseInt(text) ||
        speciality.toLowerCase().includes(text)
      )
        return review;
    });
    setShownReviews([...result]);
  };
  //END OF HANDLE SEARCH REVIEWS
  //---------------------------------

  //PARAMS
  const personalInfoData = { ...user, yearsOfExperience, textcolor_style: colorScheme === "dark" ? styles.grey_text : styles.dark_text };
  const buttonData = { button_style, title, handlePress, route_name, disabled, textcolor_style }; //current user profile button data
  const aboutData = { user_type, about, textcolor_style: colorScheme === "dark" ? styles.grey_text : styles.dark_text };
  const reviewsStatsData = {
    reviews_length: shownReviews?.length || 0,
    rating,
    textcolor_style: colorScheme === "dark" ? styles.grey_text : styles.dark_text,
    bgcolor_style,
    userIsSearchingReviews,
  };

  //----------------
  //----------------
  // MAIN COMPONENT
  //if loading submit
  if (isLoadingMutateGoOfflineExpert || isLoadingMutateAddReviewData || isLoadingMutateDeleteReviewData) {
    return (
      <View style={bgcolor_style} className="flex-1 items-center justify-center">
        <ActivityIndicatorComponent color={activityicon_color} />
      </View>
    );
  }

  return (
    <ScrollView style={bgcolor_style} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={bgcolor_style} className="flex-1 items-center">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        {user._id === currentUser_id ? (
          <View className="mt-3">
            <ButtonComponent {...buttonData} disabled={false} />
          </View>
        ) : (
          <View className="mt-5 flex-row w-1/2 justify-evenly items-center h-12">
            <ButtonComponent
              title={book_string}
              button_style={button_style}
              handlePress={handlePress}
              route_name={ROUTES.NOVICE_BOOK_APPOINTMENT}
              disabled={disabled}
            />
            <ButtonComponent
              title={message_string}
              button_style={button_style}
              handlePress={handlePress}
              route_name={ROUTES.USER_SINGLE_CHAT}
              disabled={false}
            />
          </View>
        )}

        {/* SET AVAILBILITY SWITCH SECTION */}
        <View className="w-full my-3">
          <View className="h-24 w-full items-center justify-evenly" style={styles.bg_grey}>
            <Text className="text-xs">
              {user._id !== currentUser_id
                ? user.isAvailable
                  ? expertisnowonline_string
                  : expertisnowoffline_string
                : user.isAvailable
                ? gooffline_string
                : goonline_string}
            </Text>
            <View className={`${Platform.OS === "ios" && "border"} rounded-2xl`}>
              <Switch
                disabled={user._id === currentUser_id ? false : true}
                trackColor={{ false: COLORS.white, true: COLORS.white }}
                thumbColor={isAvailable ? COLORS.blue : COLORS.white}
                onValueChange={handleSwitchPress}
                value={isAvailable}
              />
            </View>
          </View>
        </View>

        <AboutSectionComponent {...aboutData} />

        {/* REVIEWS TITLE FOR EXPERT || ADD REVIEW BUTTON FOR NOVICE */}
        <View style={styles.bg_grey} className="h-24 justify-center w-full font-bold mb-5">
          {user._id === currentUser_id ? (
            <Text style={styles.blue_text} className="font-bold text-2xl text-center uppercase">
              {reviews_string}
            </Text>
          ) : (
            <View className="items-center">
              <ButtonComponent {...buttonData} button_style="lg" title={addreview_string} route_name="review" disabled={alreadyAddedReview} />

              {/* REVIEW BOTTOM SHEET/MODAL CONTENT */}
              <RBSheet ref={modalRef} closeOnDragDown={true} closeOnPressMask={true} animationType={"fade"} customStyles={expertStyles}>
                <Text>
                  {rating_title} {user.firstName}?
                </Text>
                <AddReviewModalFormComponent modalRef={modalRef} handleRatingSubmit={handleRatingSubmit} />
              </RBSheet>
            </View>
          )}
        </View>

        {/* REVIEWS SECTION */}
        <AllReviewsStatsComponent {...reviewsStatsData} handleSearchReviewsChangeText={handleSearchReviewsChangeText} />

        <View className="w-full items-center my-5">
          {shownReviews
            ?.sort((a, b) => {
              const [first, second] = [new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime()];
              return second - first;
            })
            .map((review, index) => {
              if (review.novice_id._id === currentUser_id) {
                // not mark is to prevent reRendering infinite loop
                if (!alreadyAddedReview) setAlreadyAddedReview(true);
                return (
                  <ReviewCardComponent
                    key={index}
                    review={review}
                    handleCardClick={handleCardClick}
                    currentOwner={true}
                    handleDeleteOwnReview={handleDeleteOwnReview}
                    textcolor_style={colorScheme === "dark" ? styles.grey_text : styles.dark_text}
                  />
                );
              } else {
                return (
                  <ReviewCardComponent
                    key={index}
                    review={review}
                    handleCardClick={handleCardClick}
                    currentOwner={false}
                    handleDeleteOwnReview={handleDeleteOwnReview}
                    textcolor_style={colorScheme === "dark" ? styles.grey_text : styles.dark_text}
                  />
                );
              }
            })}
        </View>
      </View>
    </ScrollView>
  );
};

// STYLES
const expertStyles = StyleSheet.create({
  wrapper: { backgroundColor: "rgba(255,255,255,0.9)" },
  draggableIcon: styles.bg_dark,
  container: { borderTopWidth: 2, borderColor: COLORS.dark, alignItems: "center", height: "40%" },
});

export default ProfileScreen;
