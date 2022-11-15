import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ROUTES, IMAGES } from "../../constants";
import { useUserContext } from "../../hooks/UserContext";
import { firebase_db } from "../../../firebaseConfig";
import styles from "../../../styles";
import { deepCopy } from "@firebase/util";

const ChatsScreen = () => {
  const navigation = useNavigation<any>();
  const [myChats, setMyChats] = useState<any>([]);
  const { user } = useUserContext();

  //-----------------------------------------------
  //START OF HANDLING GETTING ALL CHATS IMMEDIATELY
  useEffect(() => {
    const userChatsRef = doc(firebase_db, "userChats", user._id);
    const unsub = onSnapshot(userChatsRef, (doc: any) => {
      if (doc.data()) setMyChats(Object.entries(doc.data()));
    });

    return () => {
      unsub();
    };
  }, []);
  console.log(myChats);
  //END OF HANDLING GETTING ALL CHATS IMMEDIATELY
  //-----------------------------------------------

  const handleChatClick = (type: string, data: any) => {
    // CHATS PAGE NAVIGATION
    if (type === "navigate_chat") alert("NAVIGATO");
    //  navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data });
  };

  if (myChats.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center w-3/4 text-xs font-bold">You Have No Chats &#10006;</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyMyChatsScreen} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
        {myChats?.map((chat: any, index: number) => {
          return <ChatAndAppointmentCardComponent key={index} shown_user={chat[1]} data={""} handleCardClick={handleChatClick} />;
        })}
      </ScrollView>
    </View>
  );
};

export default ChatsScreen;
