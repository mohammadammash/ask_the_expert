import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import {
  AllReviewsStatsComponent,
  ProfileImageCardComponent,
  ProfilePersonalInfoComponent,
  AvailabilitySwitchButtonComponent,
  AboutSectionComponent,
  AddReviewButtonSectionComponent,
  ButtonsComponent
} from "../../components";
import { COLORS, USERTYPES } from "../../constants";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <ScrollView>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent />

        <ProfilePersonalInfoComponent />

        <ButtonsComponent />

        <AvailabilitySwitchButtonComponent />

        <AboutSectionComponent />

        {/* REVIEWS TITLE */}
        <View style={{ backgroundColor: COLORS.grey }} className="h-24 justify-center w-full font-bold border mb-5">
          {user_type === USERTYPES.EXPERT ? (
            <Text style={{ color: COLORS.blue }} className="font-bold text-2xl text-center">
              REVIEWS
            </Text>
          ) : (
            <AddReviewButtonSectionComponent />
          )}
        </View>

        <AllReviewsStatsComponent />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
