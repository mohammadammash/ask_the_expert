import { View, Text } from "react-native";
import { useState } from "react";
//internal imports
import { ConfirmAvailabilityFormCard } from "../../components";
import { COLORS } from "../../constants";

interface AvailabilityformValues {
  meetings_time: string;
  single_session_time: string;
}

const ProfileScreen = () => {
  // START OF CONFIRM AVAILBILITY FORM DATA
  const handleSubmitForm = (values: AvailabilityformValues) => {
    alert(JSON.stringify(values, null, 2));
  };
  const [selectedMeetingsTime, setSelectedMeetingsTime] = useState("0");
  const [selectedSingleSessionTime, setSelectedSingleSessionTime] = useState("0");
  const handleSetSelectedMeetingsTime = (value: string) => setSelectedMeetingsTime(value);
  const handleSetSelectedSingleSessionTime = (value: string) => setSelectedSingleSessionTime(value);
  //PARAMS
  const data = { selectedMeetingsTime, selectedSingleSessionTime, handleSetSelectedMeetingsTime, handleSetSelectedSingleSessionTime, handleSubmitForm };
  // END OF CONFIRM AVAILBILITY FORM DATA

  // MAIN COMPONENT
  return (
    <View className="flex-1 w-full h-full items-center justify-evenly bg-white border">
      <View className="w-full px-3 items-center gap-5">
        <Text style={{ color: COLORS.blue }} className="text-slate-800 font-bold text-lg text-center">
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
