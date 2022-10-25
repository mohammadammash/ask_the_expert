import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import { ROUTES, IMAGES } from "../../constants";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">

      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800">GO online expert! 🎉</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
