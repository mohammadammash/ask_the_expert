import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ROUTES } from "../../constants";

const ChatsScreen = () => {
  const navigation = useNavigation<any>();
  const NavigateToPage = () => {
    // CHATS PAGE NAVIGATION
    navigation.navigate(ROUTES.USER_SINGLE_CHAT);
  };

  // PARAMS
  const data = {
    NavigateToPage,
  } 

  return (
    <View className="flex-1 items-center pb-5 bg-white">
      <ChatAndAppointmentCardComponent {...data}/>
    </View>
  );
};

export default ChatsScreen;
