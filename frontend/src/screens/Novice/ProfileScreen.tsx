import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
//internal imports:
import { ROUTES, IMAGES, COLORS, USERTYPES } from "../../constants";
import styles from "../../../styles";
import { ProfilePersonalInfoComponent, ProfileImageCardComponent, AboutSectionComponent } from "../../components";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const shownuser_id = 22; //user_id
  const { id, user_type } = user;

  return (
    <View className="flex-1 items-center bg-white">
      <ProfileImageCardComponent />

      <ProfilePersonalInfoComponent />

      <AboutSectionComponent />

      {/* NOVICE VISITING HIS OWN PROFILE */}
      {/* {user_type === USERTYPES.NOVICE && id === shownuser_id && (
        <View className="mt-5" style={styles.blue_button_lg}>
          <Button color={COLORS.white} title="Edit Profile" onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)} />
        </View>
      )} */}

      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800">Novice Profile! 🎉</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
