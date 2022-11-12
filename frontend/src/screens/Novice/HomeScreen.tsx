import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useUserContext } from "../../hooks/UserContext";
//internal imports
import { IMAGES, COLORS, ROUTES } from "../../constants";
import { HomeUserCardComponent } from "../../components";
import { getAuthToken } from "../../networks";
import { useCloseExperts } from "../../hooks/useNovice";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);
  const { user } = useUserContext();
  const { field } = user;

  //-------------------------------------------------------------
  //START OF GET CURRENT NOVICE LOCATION (longitude and latitude)
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  useEffect(() => {
    console.log(getAuthToken);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setIsLoadingLocation(true);
      let location = await Location.getCurrentPositionAsync({});
      setIsLoadingLocation(false);
      setLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude });
    })();
  }, []);
  //END OF GET CURRENT EXPERT LOCATION (longitude and latitude)
  //-------------------------------------------------------------

  //-------------------------------
  //START OF GETTING CLOSE EXPERTS
  const [params, setParams] = useState({});
  const [enabled, setEnabled] = useState(false);
  const { data: closeExpertData, isLoading: isLoadingCloseExpertsData } = useCloseExperts({ enabled, params });

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      setParams({ ...location, field });
      setEnabled(true);
    }
  }, [location]);

  useEffect(() => {
    if (closeExpertData) alert(JSON.stringify(closeExpertData, null, 2));
  }, [closeExpertData]);
  //END OF GETTING CLOSE EXPERTS
  //-------------------------------

  //--------------
  // MAIN COMPONENT
  //if loading location
  if (isLoadingLocation || isLoadingCloseExpertsData) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
        <Text className="text-xs w-3/4 text-center mt-5">
          {isLoadingLocation ? "Your Current Location is" : "Close Experts are"} getting loaded, it may take a few seconds
        </Text>
      </View>
    );
  }

  //Params
  const data = {
    shown_user: user,
    handleShowExpert: () => {
      navigateToPage(ROUTES.EXPERT_PROFILE);
    },
  };

  return (
    <View className="flex-1 bg-white">
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="w-full items-center justify-center h-1/5">
          <Text className="font-bold">{closeExpertData.data[0].firstName}</Text>
        </View>
        <View className="flex-1 items-center justify-end mb-7">
          <HomeUserCardComponent {...data} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
