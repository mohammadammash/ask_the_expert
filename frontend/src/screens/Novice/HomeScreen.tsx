import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image, ImageBackground } from "react-native";
import { ROUTES, IMAGES, COLORS } from "../../constants";
import styles from "../../../styles";
import { HomeUserCardComponent } from "../../components";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 items-center bg-white">
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="flex-1 items-center justify-end mb-5">
          <HomeUserCardComponent/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
