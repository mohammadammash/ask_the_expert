import { useNavigation } from "@react-navigation/native";
import { RefreshControl, View, Text, ScrollView, Switch, Platform, Alert, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { userType, useUserContext } from "../../hooks/UserContext";
import RBSheet from "react-native-raw-bottom-sheet";
//internal imports
import {
  AllReviewsStatsComponent,
  ProfileImageCardComponent,
  ProfilePersonalInfoComponent,
  AboutSectionComponent,
  AddReviewModalFormComponent,
  ButtonComponent,
  ReviewCardComponent,
} from "../../components";
import { COLORS, USERTYPES, ROUTES } from "../../constants";
import CalculateYearsOfExperienceHelper from "../Helpers/CalculateYearsOfExperienceHelper";
import { calculateReviewsStatsHelper } from "../Helpers/CalculateReviewsStatsHelper";
import styles from "../../../styles";
import { useGoOfflineExpert } from "../../hooks/useExpert";
import { useCurrentUser } from "../../hooks/useUser";
import { getAuthToken } from "../../networks";
import { useField } from "formik";

const ProfileScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<any>();
  let { user, setUser } = useUserContext();
  const currentUser_id = user._id;
  let shown_expert;
  //Expert user is accessed when novice click on close expert to view Profile
  if (route.params) shown_expert = route.params.shown_expert;
  //If novice visiting expert_profile show expert data to novice as main user
  if (shown_expert) user = { ...shown_expert };
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

  //Handling buttons clicked conditionally //For Current User Profile
  const disabled = shown_expert?.isAvailable ? false : true;
  const route_name = ROUTES.USER_EDIT_PROFILE;
  const handlePress = (route_name: string) => {
    if (route_name === "block") return alert("BLOCKED");
    else if (route_name === ROUTES.NOVICE_BOOK_APPOINTMENT) {
      //Send the shown expert appointment groups to book appointment page and do the validation there
      const appointments_groups = user.appointments_groups;
      navigation.navigate(ROUTES.NOVICE_BOOK_APPOINTMENT, { appointments_groups });
      //Send the user data to
    } else if (route_name === "review") modalRef.current?.open();
    else navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data: user });
  };
  const title = "EDIT PROFILE";
  const button_style = `${user._id === currentUser_id ? "md" : "sm"}`;

  //profile info
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);

  //REVIEW MODAL
  const modalRef = useRef();

  //allReviews Stats
  const handleCardClick = (novice_user: userType) => {
    if (user._id === currentUser_id) navigation.navigate(ROUTES.NOVICE_PROFILE, { novice_user });
  };
  type ratingContent = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };
  const [rating, setRating] = useState({ average: 0, totalOf5: 0, totalOf4: 0, totalOf3: 0, totalOf2: 0, totalOf1: 0 });
  const handleRatingType = (rating: ratingContent) => setRating(rating);
  useEffect(() => {
    if (reviews) calculateReviewsStatsHelper(reviews, handleRatingType);
  }, [reviews]);

  //PARAMS
  const personalInfoData = { ...user, yearsOfExperience };
  const buttonData = { button_style, title, handlePress, route_name, disabled }; //current user profile button data
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

        {user._id === currentUser_id ? (
          <View className="mt-3">
            <ButtonComponent {...buttonData} disabled={false} />
          </View>
        ) : (
          <View className="mt-5 flex-row w-3/4 justify-between">
            <ButtonComponent
              title="BOOK"
              button_style={button_style}
              handlePress={handlePress}
              route_name={ROUTES.NOVICE_BOOK_APPOINTMENT}
              disabled={disabled}
            />
            <ButtonComponent
              title="MESSAGE"
              button_style={button_style}
              handlePress={handlePress}
              route_name={ROUTES.USER_SINGLE_CHAT}
              disabled={false}
            />
            <ButtonComponent title="BLOCK" button_style={button_style} handlePress={handlePress} route_name="block" disabled={false} />
          </View>
        )}

        {/* SET AVAILBILITY SWITCH SECTION */}
        <View className="w-full my-3">
          <View className="h-24 w-full items-center justify-evenly" style={styles.bg_grey}>
            <Text className="text-xs font-bold">
              {user._id !== currentUser_id
                ? user.isAvailable
                  ? "EXPERT IS CURRENTLY ONLINE!"
                  : "EXPERT IS CURRENTLY OFFLINE"
                : user.isAvailable
                ? "GO OFFLINE"
                : "GO ONLINE"}
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
            <Text style={styles.blue_text} className="font-bold text-2xl text-center">
              REVIEWS
            </Text>
          ) : (
            <View className="items-center">
              <ButtonComponent {...buttonData} button_style="lg" title="ADD REVIEW" route_name="review" />

              {/* REVIEW BOTTOM SHEET/MODAL CONTENT */}
              <RBSheet ref={modalRef} closeOnDragDown={true} closeOnPressMask={true} animationType={"fade"} customStyles={expertStyles}>
                <Text>How was Your Experience with {user.firstName}?</Text>
                <AddReviewModalFormComponent modalRef={modalRef} />
              </RBSheet>
            </View>
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

// STYLES
const expertStyles = StyleSheet.create({
  wrapper: { backgroundColor: "rgba(255,255,255,0.9)" },
  draggableIcon: styles.bg_dark,
  container: { borderTopWidth: 2, borderColor: COLORS.dark, alignItems: "center", height: "40%" },
});

export default ProfileScreen;
