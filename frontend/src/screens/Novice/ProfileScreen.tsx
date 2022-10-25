import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from "react-native";
import { ROUTES, IMAGES, COLORS, USERTYPES } from "../../constants";
import styles from "../../../styles";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const shownuser_id = 22; //user_id
  const { id, user_type } = user;

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      {/* EXPERT VISITING NOVICE PROFILE */}
      {user_type === USERTYPES.EXPERT && (
        <>
          <View style={styles.blue_button_lg}>
            <Button color={COLORS.white} title="Expert Send Msg to Novice" onPress={() => navigation.navigate(ROUTES.USER_SINGLE_CHAT)} />
          </View>
          <View className="mt-5" style={styles.blue_button_lg}>
            <Button color={COLORS.white} title="Block" onPress={() => navigation.navigate(ROUTES.USER_SINGLE_CHAT)} />
          </View>
        </>
      )}

      {/* NOVICE VISITING HIS OWN PROFILE */}
      {user_type === USERTYPES.NOVICE && id === shownuser_id && (
        <View className="mt-5" style={styles.blue_button_lg}>
          <Button color={COLORS.white} title="Edit Profile" onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)} />
        </View>
      )}

      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800">Novice Profile! 🎉</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
