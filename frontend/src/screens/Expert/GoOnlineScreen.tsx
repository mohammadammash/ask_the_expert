import { useNavigation } from "@react-navigation/native";
import { View, Text} from "react-native";
import styles from "../../../styles";
import { ConfirmAvailabilityFormCard } from "../../components";
import { COLORS } from "../../constants";

const ProfileScreen = () => {

  return (
    <View className="flex-1 items-center justify-around bg-white border">
      <Text className="text-slate-800 text-xl text-center w-5/6">The World is waiting for your Touch Go Online?</Text>
      <Text className="text-center w-3/4 text-xs color-[#828282]">Choose the time you will be available by, and the time of each meeting</Text>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full items-center justify-around">
        <ConfirmAvailabilityFormCard />
      </View>
    </View>
  );
};

export default ProfileScreen;
