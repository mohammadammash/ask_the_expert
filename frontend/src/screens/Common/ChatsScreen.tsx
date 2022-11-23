import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useColorScheme } from "nativewind";
//internal imports
import { ChatAndAppointmentCardComponent, ActivityIndicatorComponent } from "../../components";
import { ROUTES, IMAGES, COLORS } from "../../constants";
import { userType, useUserContext } from "../../hooks/UserContext";
import { firebase_db } from "../../../firebaseConfig";
import styles from "../../../styles";
import { t } from "i18next";

const ChatsScreen = () => {
  //translation
  const nochats_string = t("You Have No Chats");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;

  const navigation = useNavigation<any>();
  const [myChats, setMyChats] = useState<any>([]);
  const { user } = useUserContext();

  //-----------------------------------------------
  //START OF HANDLING GETTING ALL CHATS IMMEDIATELY
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  useEffect(() => {
    setIsLoadingChats(true);
    const userChatsRef = doc(firebase_db, "userChats", user._id);
    const unsub = onSnapshot(userChatsRef, (doc: any) => {
      if (doc.data()) {
        setMyChats(Object.entries(doc.data()));
      }
      setIsLoadingChats(false);
    });

    return () => {
      unsub();
    };
  }, []);
  //END OF HANDLING GETTING ALL CHATS IMMEDIATELY
  //-----------------------------------------------

  const handleChatClick = (type: string, shown_user: userType) => {
    // CHATS PAGE NAVIGATION
    navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data: shown_user });
  };

  //--------------------------
  //MAIN COMPONENT
  //LOADING
  //loading state
  if (isLoadingChats) {
    return <ActivityIndicatorComponent color={textcolor_style.color} bgcolor_style={bgcolor_style} textcolor_style={textcolor_style} />;
  }

  //EMPTY STATE
  if (myChats.length === 0) {
    return (
      <View style={bgcolor_style} className="flex-1 justify-center items-center">
        <Text style={textcolor_style} className="text-center w-3/4 text-xs font-bold">
          {nochats_string} &#10006;
        </Text>
        <Image className="w-64 h-64" source={IMAGES.emptyMyChatsScreen} />
      </View>
    );
  }

  //MAIN
  return (
    <View style={bgcolor_style} className="flex-1 items-center">
      <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
        {myChats
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat: any) => {
            return (
              <ChatAndAppointmentCardComponent
                key={chat[0]}
                shown_user={chat[1]}
                data={""}
                handleCardClick={handleChatClick}
                textcolor_style={textcolor_style}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ChatsScreen;
