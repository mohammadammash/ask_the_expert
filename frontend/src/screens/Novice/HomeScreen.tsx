import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
//internal imports
import { userInitialData, userType, useUserContext } from "../../hooks/UserContext";
import { IMAGES, COLORS, ROUTES } from "../../constants";
import styles from "../../../styles";
import { useCloseExperts } from "../../hooks/useNovice";
import CalculateYearsOfExperience from "../Helpers/CalculateYearsOfExperienceHelper";
import { getAuthToken } from "../../networks";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useUserContext();
  const { field, profile_url } = user;

  //-------------------------------------------------------------
  //START OF GET CURRENT NOVICE LOCATION (longitude and latitude)
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        setIsLoadingLocation(true);
        const location = await Location.getCurrentPositionAsync({});
        setIsLoadingLocation(false);
        setLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude });
      } catch (err) {}
    })();
  }, []);
  //END OF GET CURRENT EXPERT LOCATION (longitude and latitude)
  //-------------------------------------------------------------

  //-------------------------------
  //START OF GETTING CLOSE EXPERTS
  const [shownExpert, setShownExpert] = useState(userInitialData);
  const handleCardPress = (shown_expert: userType) => {
    navigation.navigate(ROUTES.EXPERT_PROFILE, { shown_expert });
  };
  const handlePointerPress = (expert: userType) => {
    setShownExpert(expert);
  };
  const [params, setParams] = useState({});
  const [enabled, setEnabled] = useState(false);
  const { data: closeExpertData, isLoading: isLoadingCloseExpertsData } = useCloseExperts({ enabled, params });

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      setParams({ ...location, field });
      setEnabled(true);
    }
  }, [location]);
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
  if (closeExpertData?.data.length === 0) {
    return (
      <ImageBackground className="w-full h-full" source={IMAGES.fakeMapImage}>
        <View className="w-full items-center justify-center h-1/5 px-10">
          <Text className="font-bold text-xs text-center">
            No Experts found right now! Refresh the page after few minutes, your answer maybe one minute away, Stay Patient!
          </Text>
        </View>
      </ImageBackground>
    );
  }

  // MAIN RENDER
  return (
    <View style={mapStyles.container}>
      {/* START OF MAP VIEW */}
      <MapView
        style={mapStyles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/*MY CURRENT POINTER */}
        <Marker coordinate={location}>
          <FontAwesome5 name="location-arrow" size={24} color={COLORS.blue} />
        </Marker>

        {/* RENDER ALL POINTERS */}
        {closeExpertData.data?.map((expert: userType) => {
          const expert_cords = { longitude: expert.location.coordinates[0], latitude: expert.location.coordinates[1] };
          return (
            <Marker key={expert._id} coordinate={expert_cords} onPress={() => handlePointerPress(expert)}>
              <Ionicons name="md-location-sharp" size={45} color={COLORS.blue} />
            </Marker>
          );
        })}
      </MapView>
      {/* END OF MAP VIEW */}

      {/* START OF SHOWN USER CARD */}
      <Text>Hey</Text>
      {shownExpert._id ? (
        <View className="flex-1 w-5/6 items-center justify-end absolute bottom-5 h-36">
          <TouchableOpacity
            style={styles.shadow_bg}
            className="flex-row w-full rounded-xl border-0.5 items-center justify-evenly h-full"
            onPress={() => handleCardPress(shownExpert)}
          >
            <View style={styles.border_blue} className="avatar aspect-square max-w-1/4 max-h-1/4 h-1/4 w-1/4 rounded-full items-center border-2">
              <Image
                className="max-w-full max-h-full h-full w-full rounded-full"
                source={shownExpert.profile_url.length > 1 ? { uri: shownExpert.profile_url } : IMAGES.dummyProfile}
              />
            </View>

            <View className="h-full justify-around">
              <View className="h-1/2 gap-y-1">
                <Text className="text-base font-bold">
                  {shownExpert.firstName[0].toUpperCase() +
                    shownExpert.firstName.substring(1, shownExpert.firstName.length).toLowerCase() +
                    " " +
                    shownExpert.lastName[0].toUpperCase() +
                    shownExpert.lastName.substring(1, shownExpert.lastName.length).toLowerCase()}{" "}
                </Text>
                <Text className="text-sm opacity-80">{shownExpert.field}</Text>
                <Text className="text-xs opacity-50">{shownExpert.speciality}</Text>
              </View>
              <View className="flex-row items-center justify-between w-52">
                <View className="flex-row items-center gap-x-1">
                  <SimpleLineIcons name="location-pin" size={20} color={COLORS.blue} />
                  <Text className="text-[8px] opacity-80">{(shownExpert.distance.calculated / 1000).toFixed(2)} km away</Text>
                </View>
                <Text className="text-[8px] opacity-50">{CalculateYearsOfExperience(shownExpert.start_date).slice(0, 8)}... Of Experience</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* END OF SHOWN USER CARD */}
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
