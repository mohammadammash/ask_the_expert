import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
//internal imports
import styles from "../../../styles";
import { ROUTES, IMAGES } from "../../constants";

const ChatAndAppointmentCard = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.bg_grey_opacity30}
      className="flex-row w-5/6 border-2 rounded-lg border-[#1FA6D1] items-center justify-around h-24 mb-5"
      onPress={() => navigation.navigate(ROUTES.NOVICE_PROFILE)}
    >
      <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-2/5 w-1/5 rounded-full items-center border-2 border-[#1FA6D1]">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      <View className="h-full justify-around">
        <View>
          <Text className="text-sm font-bold">Mohammad Ammash</Text>
          <Text className="text-xs opacity-50">Senior Web Developer</Text>
        </View>
        <View className="flex-row items-center justify-between w-52 ">
          <Text className="text-xs opacity-80">Last msg 10chars..</Text>
          <Text className="text-[9px] opacity-80">1d</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatAndAppointmentCard;
