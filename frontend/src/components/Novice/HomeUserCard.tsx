import { View, Text, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons"; 
//internal imports
import styles from "../../../styles";
import { ROUTES, IMAGES, COLORS } from "../../constants";
import { HomeUserCardProps } from "./types";


const HomeUserCard : React.FC<HomeUserCardProps> = ({navigateToPage}) => {
  return (
    <TouchableOpacity style={styles.shadow_bg} className="flex-row w-5/6 rounded-xl border-0.5 items-center justify-evenly h-1/5" onPress={() => navigateToPage(ROUTES.EXPERT_PROFILE)}>
      <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square max-w-1/4 max-h-1/4 h-1/4 w-1/4 rounded-full items-center border-2">
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
            <SimpleLineIcons name="location-pin" size={24} color={COLORS.blue} />
            <Text className="text-[10px] opacity-80">5 km away</Text>
          </View>
          <Text className="text-[9px] opacity-50">3 years Experience</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeUserCard;
