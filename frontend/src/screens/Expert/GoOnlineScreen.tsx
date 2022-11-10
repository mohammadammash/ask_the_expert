import { View, Text } from "react-native";
import { useState, useEffect } from "react";
//internal imports
import { ConfirmAvailabilityFormCard } from "../../components";
import styles from "../../../styles";
import { useGoOnlineExpert } from "../../hooks/useExpert";
import { AvailabilityformValuesTypes } from "../../components/Expert/types";

const ProfileScreen = () => {
  const { mutate: mutateGoOnlineExpert, isLoading: mutateGoOnlineExpertIsLoading, data: mutateLoginUserData } = useGoOnlineExpert();

  // START OF CONFIRM AVAILBILITY FORM DATA
  const handleSubmitForm = (values: AvailabilityformValuesTypes) => {
    setUnMatchedOptions(false);
    if (values.meetings_time % values.single_session_time !== 0) {
      setUnMatchedOptions(true);
      return;
    }
    alert(JSON.stringify(values, null, 2));
  };
  const [unmatchedOptions, setUnMatchedOptions] = useState(false);

  //PARAMS
  const data = {
    handleSubmitForm,
    unmatchedOptions,
  };
  // END OF CONFIRM AVAILBILITY FORM DATA

  // MAIN COMPONENT
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
