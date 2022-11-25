import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import styles from "../../../styles";
import { userInitialData, useUserContext } from "../../hooks/UserContext";
import { updateDoc, doc, getDoc, setDoc, serverTimestamp, onSnapshot, arrayUnion } from "firebase/firestore";
import { firebase_db } from "../../../firebaseConfig";
import { t } from "i18next";

const SingleChatScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  //translation
  const typemessage_placeholder = t("Type message...");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.white_text : styles.dark_text;

  //ALWAYS THIS PAGE SHOULD BE AS PART FROM ANOTHER SCREEN STACK
  let shown_user = { ...userInitialData };
  if (route.params.data) shown_user = route.params.data;
  const { _id, firstName, lastName, profile_url, speciality } = shown_user;
  //CURRENT USER
  const { user } = useUserContext();
  const currentUser = { ...user };

  //-------------------------------
  //START OF HANDLING LAYOUT HEADER
  useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <View className="h-full w-72 flex-row">
          <Image
            className="object-cover h-11 w-11 rounded-full border-2 border-white"
            source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
          />
          <View className="justify-center ml-3">
            <Text className="font-bold text-base" style={styles.white_text}>
              {firstName[0].toUpperCase() +
                firstName.substring(1, firstName.length).toLowerCase() +
                " " +
                lastName[0].toUpperCase() +
                lastName.substring(1, lastName.length).toLowerCase()}{" "}
            </Text>
            <Text style={styles.white_text} className="text-[10px]">
              {speciality}
            </Text>
          </View>
        </View>
      ),
    });
  }, [shown_user]);
  //END OF HANDLING LAYOUT HEADER
  //-------------------------------

  //Start of handling check if chat exists
  const [messages, setMessages] = useState<any>([]);

  const checkIfChatExists = async (chat_id: string) => {
    try {
      const chatsDocRef = doc(firebase_db, "chats", chat_id);
      const chatDocSnap = await getDoc(chatsDocRef);
      if (chatDocSnap.exists()) return true;
      return false;
    } catch (err) {
      alert(`ERROR` + err);
    }
  };

  const createChatIfFirstTime = async () => {
    const combined_id = currentUser._id > shown_user._id ? currentUser._id + shown_user._id : shown_user._id + currentUser._id; //constant way to store key
    const exists = await checkIfChatExists(combined_id);
    try {
      if (!exists) {
        //if chat not already created => create one
        const chatsDocRef = doc(firebase_db, "chats", combined_id);
        await setDoc(chatsDocRef, { messages: [] });

        //create user chats
        const shownUserChatsRef = doc(firebase_db, "userChats", shown_user._id);
        await setDoc(
          shownUserChatsRef,
          {
            [combined_id]: {
              _id: currentUser._id,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              speciality: currentUser.speciality,
              profile_url: currentUser.profile_url,
              date: serverTimestamp(),
            },
          },
          { merge: true }
        );

        const currentUserChatsRef = doc(firebase_db, "userChats", currentUser._id);
        await setDoc(
          currentUserChatsRef,
          {
            [combined_id]: {
              _id: shown_user._id,
              firstName: shown_user.firstName,
              lastName: shown_user.lastName,
              speciality: shown_user.speciality,
              profile_url: shown_user.profile_url,
              date: serverTimestamp(),
            },
          },
          { merge: true }
        );
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    createChatIfFirstTime();
  }, []);
  //End of hanlding check if chat exists

  //Start of loading messages in realtime
  useEffect(() => {
    const combined_id = currentUser._id > shown_user._id ? currentUser._id + shown_user._id : shown_user._id + currentUser._id;
    const messagesChatRef = doc(firebase_db, "chats", combined_id);
    const unsub = onSnapshot(messagesChatRef, (doc) => {
      if (doc.exists()) {
        setMessages([
          ...doc
            .data()
            ?.messages.reverse()
            .map((msg) => {
              return { ...msg, createdAt: msg.createdAt.toDate() };
            }),
        ]);
      }
    });

    return () => {
      unsub();
    };
  }, [shown_user._id]);
  //End of loading messages in realtime

  //Start of Send Message
  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages)); //add my message to screen
    //Get message sent needed data
    let { _id, text, user, createdAt } = messages[0];
    const user_id = user._id;
    const combined_id = user_id > shown_user._id ? user_id + shown_user._id : shown_user._id + user_id;

    try {
      //Upload message to chat messages between current and shown user
      const messagesChatRef = doc(firebase_db, "chats", combined_id);
      await updateDoc(messagesChatRef, { messages: arrayUnion({ _id, createdAt, text, user }) });
      //Upload latest message to userChats for current user
      const currentUserChatsRef = doc(firebase_db, "userChats", user_id);
      await updateDoc(currentUserChatsRef, {
        [combined_id]: {
          _id: shown_user._id,
          firstName: shown_user.firstName,
          lastName: shown_user.lastName,
          speciality: shown_user.speciality,
          profile_url: shown_user.profile_url,
          date: serverTimestamp(),
          lastMessage: text,
        },
      });
      //Upload latest message to userChats for shown user
      const shownUserChatsRef = doc(firebase_db, "userChats", shown_user._id);
      await updateDoc(shownUserChatsRef, {
        [combined_id]: {
          _id: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          speciality: currentUser.speciality,
          profile_url: currentUser.profile_url,
          date: serverTimestamp(),
          lastMessage: text,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);
  //End of Send Message

  //END OF HANDLING MESSAGES
  //-------------------------------

  return (
    <View style={bgcolor_style} className="flex-1 h-full items-center">
      <View className="h-full w-full">
        {messages.length === 0 ? <Text style={textcolor_style} className="text-center mt-10">Say Hello! &#128075;</Text> : null}
        <GiftedChat
          placeholder={typemessage_placeholder}
          messages={messages}
          renderAvatar={null}
          onSend={(messages: any) => onSend(messages)}
          user={{
            _id: user._id,
          }}
          renderSend={(props) => (
            <Send {...props} containerStyle={commonStyles.sendMessageInput}>
              <FontAwesome name="send" size={24} color={COLORS.blue} />
            </Send>
          )}
        />
      </View>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  sendMessageInput: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});

export default SingleChatScreen;
