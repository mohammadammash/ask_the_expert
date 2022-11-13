import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
//internal imports
import { userType, useUserContext } from "../../hooks/UserContext";
import { IMAGES, COLORS, ROUTES } from "../../constants";
import styles from "../../../styles";
import { getAuthToken } from "../../networks";
import { useCloseExperts } from "../../hooks/useNovice";
import { SimpleLineIcons } from "@expo/vector-icons";
//internal imports

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);
  const { user } = useUserContext();
  const { field, profile_url } = user;

  //-------------------------------------------------------------
  //START OF GET CURRENT NOVICE LOCATION (longitude and latitude)
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  useEffect(() => {
    console.log(getAuthToken);
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setIsLoadingLocation(true);
      const location = await Location.getCurrentPositionAsync({});
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
    // if (closeExpertData) alert(JSON.stringify(closeExpertData, null, 2));
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

  //EMPTY STATE
  if (!closeExpertData.data) {
    return (
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="w-full items-center justify-center h-1/5">
          <Text className="font-bold">
            No Experts found right now! Refresh the page after few minutes, your answer maybe one minute away, Stay Patient!
          </Text>
        </View>
      </ImageBackground>
    );
  }

  //IF AT LEAST ONE EXPERT FOUND
  // {
  // closeExpertData.data?.map((expert: userType) => {
  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} title="My Place" description="Current location" image={{ uri: profile_url }}>
          <Image source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile} />
        </Marker>
      </MapView>
      <View className="flex-1 w-4/5 items-center justify-end absolute bottom-5 h-32">
        <TouchableOpacity
          style={styles.shadow_bg}
          className="flex-row w-full rounded-xl border-0.5 items-center justify-evenly h-full"
          onPress={navigateToPage}
        >
          <View style={styles.border_blue} className="avatar aspect-square max-w-1/4 max-h-1/4 h-1/4 w-1/4 rounded-full items-center border-2">
            <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
          </View>

          <View className="h-full justify-around">
            <View className="h-1/2 gap-y-1">
              <Text className="text-base font-bold">Mohammad Ammash</Text>
              <Text className="text-sm opacity-80">Technology</Text>
              <Text className="text-xs opacity-50">Senior Web Developer</Text>
            </View>
            <View className="flex-row items-center justify-between w-52">
              <View className="flex-row items-center gap-x-1">
                <SimpleLineIcons name="location-pin" size={20} color={COLORS.blue} />
                <Text className="text-[8px] opacity-80">5 km away</Text>
              </View>
              <Text className="text-[8px] opacity-50">3 years Experience</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
  // });
  // }
};

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ProfileScreen;
