import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from "react-native";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";

const ChatsScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-slate-800">All Chats! 🎉</Text>
      <ChatAndAppointmentCardComponent />
    </View>
  );
};

export default ChatsScreen;
