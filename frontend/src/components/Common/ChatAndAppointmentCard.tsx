import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
//internal imports
import { IMAGES } from "../../constants";
import { ChatAndAppointmentCardProps } from "./types";
import TurnUTCToLocateTimeHelper from "../../screens/Helpers/TurnUTCToLocalTimeHelper";
import { userType } from "../../hooks/UserContext";

const ChatAndAppointmentCard: React.FC<ChatAndAppointmentCardProps> = ({ handleAppointmentClick, data, currentUser_type }) => {
  //If current user is novice populated data is for expert and vice versa
  let shown_user: userType;
  if (currentUser_type === "novice") shown_user = data.expert_id;
  else shown_user = data.novice_id;
  const { profile_url, firstName, lastName, speciality } = shown_user;
  let { start_timestamp, end_timestamp, notes } = data;
  //assure stored dates are of type date not string
  start_timestamp = new Date(start_timestamp);
  end_timestamp = new Date(end_timestamp);

  return (
    // CHATS TOUCHABLE OPACITY
    // <TouchableOpacity
    //   style={styles.bg_grey_opacity30}
    //   className="flex-row w-5/6 rounded-lg border-0.5 items-center justify-around h-24 mb-5"
    //   onPress={NavigateToSingleChat}
    // >

    <View className="flex-row w-full border-b-0.5 items-center justify-around h-28 ">
      <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-1/6 w-1/6 rounded-full items-center border-2 border-[#1FA6D1]">
        <Image
          className="max-w-full max-h-full h-full w-full rounded-full"
          source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
        />
      </View>

      <View className="h-full w-4/6 justify-around">
        <View>
          <Text className="text-sm font-bold">
            {firstName[0].toUpperCase() +
              firstName.substring(1, firstName.length).toLowerCase() +
              " " +
              lastName[0].toUpperCase() +
              lastName.substring(1, lastName.length).toLowerCase()}{" "}
          </Text>
          <Text className="text-xs opacity-50">{speciality}</Text>
        </View>

        {/* CHATS CARD: */}
        {/* <View className="flex-row items-center justify-between w-52 ">
            <Text className="text-xs opacity-80">Last msg 10chars..</Text>
            <Text className="text-[9px] opacity-80">1d</Text>
          </View> */}

        {/* APPOINTMENTS CARD: */}
        <View>
          <Text className="text-[10px]">{notes}</Text>
        </View>
        <View className="flex-row items-center justify-between w-full">
          <View className="opacity-80 flex-row gap-2">
            <MaterialCommunityIcons onPress={() => handleAppointmentClick("remove", data._id)} name="book-cancel" size={24} color="black" />
            <Entypo name="new-message" size={24} color="black" onPress={() => handleAppointmentClick("chat", shown_user)} />
          </View>
          <View className="gap-1">
            <Text className="text-[9px] opacity-80">{TurnUTCToLocateTimeHelper(start_timestamp)}</Text>
            <Text className="text-[9px] opacity-80">{TurnUTCToLocateTimeHelper(end_timestamp)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatAndAppointmentCard;
