import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import { AllReviewsStatsComponent, ProfileImageCardComponent, ProfilePersonalInfoComponent } from "../../components";
import { COLORS} from "../../constants";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <ScrollView>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent />

        <ProfilePersonalInfoComponent />

        {/* REVIEWS TITLE */}
        <View style={{ backgroundColor: COLORS.grey }} className="h-24 justify-center w-full font-bold">
          <Text style={{ color: COLORS.blue }} className="font-bold text-2xl text-center">
            REVIEWS
          </Text>
        </View>
      </View>

      <AllReviewsStatsComponent />
    </ScrollView>
  );
};

export default ProfileScreen;
