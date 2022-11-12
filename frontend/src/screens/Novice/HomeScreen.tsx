import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
//internal imports
import { IMAGES, COLORS } from "../../constants";
import { HomeUserCardComponent } from "../../components";
import styles from "../../../styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);

  const data = {
    navigateToPage,
  };

  //-------------------------------------------------------------
  //START OF GET CURRENT NOVICE LOCATION (longitude and latitude)
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setIsLoadingLocation(true);
      let location = await Location.getCurrentPositionAsync({});
      setIsLoadingLocation(false);
      setLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude });
      alert(JSON.stringify({ l1: location.coords.longitude, l2: location.coords.latitude }, null, 2));
    })();
  }, []);
  //END OF GET CURRENT EXPERT LOCATION (longitude and latitude)
  //-------------------------------------------------------------

  //--------------
  // MAIN COMPONENT
  //if loading location
  if (isLoadingLocation) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
        <Text className="text-xs w-3/4 text-center mt-5">Your Current Location is getting loaded, it may take a few seconds</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="w-full items-center justify-center h-1/5">
          <Text className="font-bold">No Available Experts Found Right Now!</Text>
        </View>
        <View className="flex-1 items-center justify-end mb-7">
          <HomeUserCardComponent {...data} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
