import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
//internal imports
import { IMAGES } from "../../constants";
import { ChatAndAppointmentCardProps } from "./types";

const ChatAndAppointmentCard : React.FC<ChatAndAppointmentCardProps> = ({
  NavigateToPage
}) => {

  return (
    // CHATS TOUCHABLE OPACITY
    // <TouchableOpacity
    //   style={styles.bg_grey_opacity30}
    //   className="flex-row w-5/6 rounded-lg border-0.5 items-center justify-around h-24 mb-5"
    //   onPress={NavigateToSingleChat}
    // >

    <View className="flex-row w-full border-0.5 items-center justify-around h-24 mb-5">
      <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-1/6 w-1/6 rounded-full items-center border-2 border-[#1FA6D1]">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      <View className="h-full w-4/6 justify-around">
        <View>
          <Text className="text-sm font-bold">Mohammad Ammash</Text>
          <Text className="text-xs opacity-50">Senior Web Developer</Text>
        </View>

        {/* CHATS CARD: */}
        {/* <View className="flex-row items-center justify-between w-52 ">
            <Text className="text-xs opacity-80">Last msg 10chars..</Text>
            <Text className="text-[9px] opacity-80">1d</Text>
          </View> */}

        {/* APPOINTMENTS CARD: */}
        <View className="flex-row items-center justify-between w-full">
          <View className="opacity-80 flex-row gap-2">
            <MaterialCommunityIcons onPress={() => alert("Removed")} name="book-cancel" size={24} color="black" />
            <Entypo name="new-message" size={24} color="black" onPress={NavigateToPage}/>
          </View>
          <View className="gap-1">
            <Text className="text-[9px] opacity-80">12:15pm</Text>
            <Text className="text-[9px] opacity-80">12:30pm</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatAndAppointmentCard;
