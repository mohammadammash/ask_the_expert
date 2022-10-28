import { useNavigation } from "@react-navigation/native";
import { View, Text} from "react-native";
import { ConfirmAvailabilityFormCard } from "../../components";

const ProfileScreen = () => {

  return (
    <View className="items-center bg-white border">
      <Text className="text-slate-800 text-xl text-center w-5/6">The World is waiting for your Touch Go Online?</Text>
      <View></View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View>
        <ConfirmAvailabilityFormCard/>
      </View>

    </View>
  );
};

export default ProfileScreen;
