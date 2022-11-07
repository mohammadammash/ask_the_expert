import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import {
  AllReviewsStatsComponent,
  ProfileImageCardComponent,
  ProfilePersonalInfoComponent,
  AvailabilitySwitchButtonComponent,
  AboutSectionComponent,
  AddReviewButtonSectionComponent,
  ButtonsComponent,
  ReviewCardComponent,
} from "../../components";
import { COLORS, USERTYPES, ROUTES } from "../../constants";
import CalculateYearsOfExperienceHelper from "../Helpers/CalculateYearsOfExperienceHelper";
import { calculateReviewsStatsHelper } from "../Helpers/CalculateReviewsStatsHelper";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);
  const { user, setUser } = useContext(UserContext);
  const { profile_url, user_type, online, about } = user;

  //profile info
  const yearsOfExperience = CalculateYearsOfExperienceHelper(user.start_date);

  //REVIEW MODAL
  const modalRef = useRef();

  //allReviews Stats
  const reviews = [
    { rating: 5, content: "Bruhh", created_at: Date.now() },
    { rating: 1, content: "Good Dude!1", created_at: Date.now() },
    { rating: 4, content: "Very Good!!", created_at: Date.now() },
    { rating: 5, content: "Wow!! Enormous info", created_at: Date.now() },
    { rating: 3, content: "Not Badd :(", created_at: Date.now() },
    { rating: 3, content: "Normal, can be better", created_at: Date.now() },
    { rating: 3, content: "Bad For me dude!", created_at: Date.now() },
  ];
  type ratingContent = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };
  const [rating, setRating] = useState({ average: 0, totalOf5: 0, totalOf4: 0, totalOf3: 0, totalOf2: 0, totalOf1: 0 });
  const handleRatingTpe = (rating: ratingContent) => setRating(rating);
  useEffect(() => {
    calculateReviewsStatsHelper(reviews, handleRatingTpe);
  }, []);

  //PARAMS
  const personalInfoData = { ...user, yearsOfExperience };
  const availbilitySwitchData = { user_type, online, navigateToPage };
  const buttonsData = { user_type, navigateToPage };
  const aboutData = { user_type, about };

  return (
    <ScrollView>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        <ButtonsComponent {...buttonsData} />

        <AvailabilitySwitchButtonComponent {...availbilitySwitchData} />

        <AboutSectionComponent {...aboutData} />

        {/* REVIEWS TITLE */}
        <View style={styles.bg_grey} className="h-24 justify-center w-full font-bold border mb-5">
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

        <AllReviewsStatsComponent rating={rating} reviews={reviews} />

        {/* ALL REVIEWS SHOW */}
        <View className="w-full items-center my-5">
          {reviews.map((review, index) => (
            <ReviewCardComponent key={index} review={review} navigateToPage={navigateToPage} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
