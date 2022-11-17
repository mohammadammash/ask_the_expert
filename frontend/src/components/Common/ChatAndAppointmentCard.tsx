import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
//internal imports
import { IMAGES } from "../../constants";
import { ChatAndAppointmentCardProps } from "./types";
import TurnUTCToLocateTimeHelper from "../../screens/Helpers/TurnUTCToLocalTimeHelper";
import { t } from "i18next";
import styles from "../../../styles";

const ChatAndAppointmentCard: React.FC<ChatAndAppointmentCardProps> = ({ handleCardClick, data, shown_user, textcolor_style }) => {
  //translation
  const start_conv_string = t("Tap to start the conversation");

  const { profile_url, firstName, lastName, speciality, lastMessage, date } = shown_user;
  let shown_date;

  //ONLY CHAT
  if (date) {
    shown_date = new Timestamp(date.seconds, date.nanoseconds).toDate();
    shown_date = shown_date.toLocaleDateString() + " " + shown_date.toLocaleTimeString();
  }
  //ONLY APPOINTMENT
  let start_timestamp;
  let end_timestamp;
  let notes;
  if (data) {
    start_timestamp = new Date(data.start_timestamp);
    end_timestamp = new Date(data.end_timestamp);
    notes = data.notes;
  }

  return (
    //Touch navigation for chat card only
    <TouchableOpacity onPress={() => handleCardClick("navigate_chat", shown_user)}>
      <View className="flex-row w-full border-b-0.5 items-center justify-around h-28">
        <View className="avatar aspect-square max-w-1/5 max-h-1/5 h-1/6 w-1/6 rounded-full items-center border-2 border-[#1FA6D1]">
          <Image
            className="max-w-full max-h-full h-full w-full rounded-full"
            source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
          />
        </View>

        <View className="h-full w-4/6 justify-around">
          <View>
            <Text style={textcolor_style} className="text-sm font-bold">
              {firstName[0].toUpperCase() +
                firstName.substring(1, firstName.length).toLowerCase() +
                " " +
                lastName[0].toUpperCase() +
                lastName.substring(1, lastName.length).toLowerCase()}{" "}
            </Text>
            <Text style={textcolor_style} className="text-xs opacity-50">
              {speciality}
            </Text>
          </View>

          {/* APPOINTMENTS CARD: */}
          {data ? (
            <>
              <View>
                <Text style={textcolor_style} className={`text-[9px] ${notes ? "" : "opacity-40 italic"}`}>
                  {notes ? notes : "//No Notes"}
                </Text>
              </View>
              <View className="flex-row items-center justify-between w-full">
                <View className="opacity-80 flex-row gap-2">
                  <MaterialCommunityIcons onPress={() => handleCardClick("remove", data._id)} name="book-cancel" size={24} color="black" />
                  <Entypo name="new-message" size={24} color="black" onPress={() => handleCardClick("chat", shown_user)} />
                </View>
                <View className="gap-1">
                  <Text style={textcolor_style} className="text-[9px] opacity-80">
                    {TurnUTCToLocateTimeHelper(start_timestamp)}
                  </Text>
                  <Text style={textcolor_style} className="text-[9px] opacity-80">
                    {TurnUTCToLocateTimeHelper(end_timestamp)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            // CHAT CARD
            <View className="flex-row items-end justify-between w-full">
              {lastMessage ? (
                <Text className="text-xs" style={textcolor_style}>
                  {lastMessage.slice(0, 10)}...
                </Text>
              ) : (
                <Text style={textcolor_style} className="opacity-50 italic text-[10px]">
                  {start_conv_string}
                </Text>
              )}
              <Text style={textcolor_style} className="text-[8px] opacity-50">
                {shown_date}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatAndAppointmentCard;
