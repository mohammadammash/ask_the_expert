import { useNavigation } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import { useState } from "react";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ROUTES, IMAGES } from "../../constants";

const ChatsScreen = () => {
  const navigation = useNavigation<any>();
  const [myChats, setMyChats] = useState([]);
  const handleChatClick = () => {
    // CHATS PAGE NAVIGATION
    navigation.navigate(ROUTES.USER_SINGLE_CHAT);
  };


  if (myChats.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center w-3/4 text-xs font-bold">You Have No Chats &#10006;</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyMyChatsScreen} />
      </View>
    );
  }

  // return (
  //   <View className="flex-1 items-center bg-white">
  //     <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
  //       {myChats?.map((chat: any, index: number) => {
  //         return <ChatAndAppointmentCardComponent key={index} shown_user={shown_user} data={chat} handleAppointmentClick={handleChatClick} />;
  //       })}
  //     </ScrollView>
  //   </View>
  // );
};

export default ChatsScreen;
