import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import styles from "../../../styles";
import { ConfirmAvailabilityFormCard } from "../../components";
import { COLORS } from "../../constants";

const ProfileScreen = () => {
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
          <ConfirmAvailabilityFormCard />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
