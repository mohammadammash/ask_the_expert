import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
//internal imports
import { ConfirmAvailabilityFormCard } from "../../components";
import styles from "../../../styles";
import { ROUTES, COLORS } from "../../constants";
import { useGoOnlineExpert } from "../../hooks/useExpert";
import { AvailabilityformValuesTypes } from "../../components/Expert/types";
import { useUserContext } from "../../hooks/UserContext";
import { t } from "i18next";

const ProfileScreen = () => {
  //translation
  const locationloading_string = t("Your Current Location is getting loaded, it may take a few seconds");
  const goonline_maintitle = t("The World is waiting for your Touch Go Online");
  const goonline_title = t("Choose the time you will be available by, and the time of each meeting");
  
  const navigation = useNavigation<any>();
  const { user, setUser } = useUserContext();

  //-------------------------------------------------------------
  //START OF GET CURRENT EXPERT LOCATION (longitude and latitude)
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
    })();
  }, []);
  //END OF GET CURRENT EXPERT LOCATION (longitude and latitude)
  //-------------------------------------------------------------

  //----------------------------------------
  // START OF CONFIRM AVAILBILITY FORM DATA
  const { mutate: mutateGoOnlineExpert, isLoading: mutateGoOnlineExpertIsLoading, isSuccess: mutateGoOnlineExpertIsSuccess } = useGoOnlineExpert();
  //if finished loading and success:
  useEffect(() => {
    if (mutateGoOnlineExpertIsSuccess) {
      setUser({ ...user, isAvailable: true });
      navigation.navigate(ROUTES.EXPERT_PROFILE);
    }
  }, [mutateGoOnlineExpertIsSuccess]);

  const handleSubmitForm = (values: AvailabilityformValuesTypes) => {
    setUnMatchedOptions(false);
    if (values.meetings_time % values.single_session_time !== 0) {
      setUnMatchedOptions(true);
      return;
    }
    const data = { ...values, ...location };
    mutateGoOnlineExpert(data);
  };
  const [unmatchedOptions, setUnMatchedOptions] = useState(false);

  //PARAMS
  const data = {
    handleSubmitForm,
    unmatchedOptions,
  };
  // END OF CONFIRM AVAILBILITY FORM DATA
  //----------------------------------------

  //--------------
  // MAIN COMPONENT
  //if loading location
  if (isLoadingLocation) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
        <Text className="text-xs w-3/4 text-center mt-5">{locationloading_string}</Text>
      </View>
    );
  }

  //if loading submit
  if (mutateGoOnlineExpertIsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <View className="flex-1 w-full h-full items-center justify-evenly bg-white border">
      <View className="w-full px-3 items-center gap-5">
        <Text style={styles.blue_text} className="text-slate-800 font-bold text-lg text-center">
          {goonline_maintitle}
        </Text>
        <Text className="text-center w-3/4 text-xs color-[#828282]">{goonline_title}</Text>
      </View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full h-3/5 items-center justify-center">
        <View className="w-5/6 h-5/6 border-2 rounded-xl">
          <ConfirmAvailabilityFormCard {...data} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
