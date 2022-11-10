import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
//internal imports
import { ConfirmAvailabilityFormCard } from "../../components";
import styles from "../../../styles";
import { ROUTES } from "../../constants";
import { useGoOnlineExpert } from "../../hooks/useExpert";
import { AvailabilityformValuesTypes } from "../../components/Expert/types";
import { useUserContext } from "../../hooks/UserContext";

const ProfileScreen = () => {
  const { mutate: mutateGoOnlineExpert, isLoading: mutateGoOnlineExpertIsLoading, isSuccess: mutateGoOnlineExpertIsSuccess } = useGoOnlineExpert();
  const navigation = useNavigation<any>();
  const { user, setUser } = useUserContext();

  //if finished loading and success:
  useEffect(() => {
    if (mutateGoOnlineExpertIsSuccess) {
      setUser({ ...user, isAvailable: true });
      navigation.navigate(ROUTES.EXPERT_PROFILE);
    }
  }, [mutateGoOnlineExpertIsSuccess]);

  // START OF CONFIRM AVAILBILITY FORM DATA
  const handleSubmitForm = (values: AvailabilityformValuesTypes) => {
    setUnMatchedOptions(false);
    if (values.meetings_time % values.single_session_time !== 0) {
      setUnMatchedOptions(true);
      return;
    }
    mutateGoOnlineExpert(values);
  };
  const [unmatchedOptions, setUnMatchedOptions] = useState(false);

  //PARAMS
  const data = {
    handleSubmitForm,
    unmatchedOptions,
  };
  // END OF CONFIRM AVAILBILITY FORM DATA

  // MAIN COMPONENT
  //if loading submit
  if (mutateGoOnlineExpertIsLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View className="flex-1 w-full h-full items-center justify-evenly bg-white border">
      <View className="w-full px-3 items-center gap-5">
        <Text style={styles.blue_text} className="text-slate-800 font-bold text-lg text-center">
          The World is waiting for your Touch Go Online?
        </Text>
        <Text className="text-center w-3/4 text-xs color-[#828282]">Choose the time you will be available by, and the time of each meeting</Text>
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
