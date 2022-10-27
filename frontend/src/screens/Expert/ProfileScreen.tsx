import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import { ProfileImageCardComponent, ProfilePersonalInfoComponent } from "../../components";
import { ROUTES, COLORS, USERTYPES } from "../../constants";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <View className="flex-1 items-center bg-white">

      <ProfileImageCardComponent />

      {user_type === USERTYPES.EXPERT && (
        <>
          <View>
            <Pressable className="mt-2" style={styles.blue_button_md} onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)}>
              <Text className="text-white font-bold text-base">EDIT PROFILE</Text>
            </Pressable>
          </View>
        </>
      )}

      <ProfilePersonalInfoComponent/>
    </View>
  );
};

export default ProfileScreen;
