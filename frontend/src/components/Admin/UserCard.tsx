import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from "react-native";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../../styles";
import UserMoreInfoSectionComponent from "./UserMoreInfoSection";

const UserCard = () => {
  return (
    <ScrollView>
      <TouchableOpacity style={[styles.shadow_bg,{ borderColor: COLORS.blue }]} className="rounded-lg border-2 items-center w-96 ml-2 min-h-64 pt-3 mb-5">
        <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square max-w-28 max-h-28 h-2/5 w-2/5 rounded-full items-center border-4">
          <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
        </View>

        <View className="text-center w-full">
          <Text className="font-bold text-center text-lg">Mohammad THETOP</Text>
          <Text className="text-sm opacity-50 text-center">Senior Web Developer</Text>
          <Text className="text-xs font-semibold text-center mt-2">EXPERT</Text>
          <View className="absolute right-0 h-full justify-center mr-1">
            <AntDesign name="rightcircle" size={24} color="black" />
          </View>
        </View>

        <View className="h-1/3 justify-end pb-5">
          <Text className="opacity-40 italic text-sm">Press On The Card To View All Info</Text>
        </View>

        {/* IF NOVICE CARD - send user maybe and data or whatever - when card is clicked */}
        {/* <UserMoreInfoSectionComponent /> */}

        {/* IF EXPERT CARD - send user type or data and check there */}
        {/* <UserMoreInfoSectionComponent/> */}

      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserCard;
