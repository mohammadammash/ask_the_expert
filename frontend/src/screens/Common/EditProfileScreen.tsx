import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import { ROUTES, IMAGES } from "../../constants";
import styles from "../../../styles";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800">Edit Profile Screen! 🎉</Text>
      </View>
    </View>
  );
};

export default EditProfileScreen;
