import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import { AllReviewsStatsComponent, ProfileImageCardComponent, ProfilePersonalInfoComponent } from "../../components";
import { ROUTES, COLORS, USERTYPES } from "../../constants";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <ScrollView>
      <View className="flex-1 items-center bg-white">
        <ProfileImageCardComponent />

        {user_type === USERTYPES.EXPERT && (
          <View>
            <Pressable className="mt-2" style={styles.blue_button_md} onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)}>
              <Text className="text-white font-bold text-base">EDIT PROFILE</Text>
            </Pressable>
          </View>
        )}

        <ProfilePersonalInfoComponent />

        <View style={{ backgroundColor: COLORS.blue }} className="h-24 justify-center w-full border-y">
          <Text style={{ color: COLORS.white }} className="text-2xl text-center">
            REVIEWS
          </Text>
        </View>
      </View>

      <AllReviewsStatsComponent/>
    </ScrollView>
  );
};

export default ProfileScreen;
