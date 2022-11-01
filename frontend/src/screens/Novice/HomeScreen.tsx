import { useNavigation } from "@react-navigation/native";
import { View ,ImageBackground } from "react-native";
import {  IMAGES} from "../../constants";
import { HomeUserCardComponent } from "../../components";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);

  const data = {
    navigateToPage,
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="flex-1 items-center justify-end mb-5">
          <HomeUserCardComponent {...data}/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
