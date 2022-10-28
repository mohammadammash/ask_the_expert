import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import { ROUTES, IMAGES } from "../../constants";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="items-center bg-white border">
      <Text className="text-slate-800 text-xl text-center w-5/6">The World is waiting for your Touch Go Online?</Text>
      <View></View>

      <View>
        <Pressable className="my-2" style={styles.blue_button_lg} onPress={() => navigation.navigate(ROUTES.EXPERT_PROFILE)}>
          <Text className="text-white font-bold text-base">CONFIRM</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
