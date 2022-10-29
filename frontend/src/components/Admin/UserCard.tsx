import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../../styles";

const UserCard = () => {
  return (
    <TouchableOpacity style={{ borderColor: COLORS.blue }} className="rounded-lg border-2 items-center mx-5 w-64 pt-3 h-72  bg-slate-100 bg-opacity-70">
      <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square max-w-2/5 max-h-2/5 h-2/5 w-2/5 rounded-full items-center border-4">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      <View className="relative text-center w-full">
        <Text className="font-bold text-center text-lg">Mohammad THETOP</Text>
        <Text className="text-sm opacity-50 text-center">Senior Web Developer</Text>
        <Text className="text-xs font-semibold text-center mt-2">EXPERT</Text>
        <View className="absolute right-0 h-full justify-center mr-1">
          <AntDesign name="rightcircle" size={24} color="black" />
        </View>
      </View>

      <View className="h-1/3 justify-end pb-2">
        <Text className="opacity-40 italic text-sm">Press On The Card To View All Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
