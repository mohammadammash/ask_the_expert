import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from "react-native";
import { ROUTES, IMAGES, COLORS } from "../../constants";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2 items-center">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>
      <View style={styles.blue_button_lg}>
        <Button color={COLORS.white} title="Edit Profile" onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)} />
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800 mb-5">Styling just works! 🎉</Text>
        <View style={styles.blue_button_lg}>
          <Button color={COLORS.white} title="Go Online" onPress={() => navigation.navigate(ROUTES.EXPERT_GO_ONLINE)} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
