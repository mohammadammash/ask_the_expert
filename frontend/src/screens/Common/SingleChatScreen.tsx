import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import styles from "../../../styles";
import { userInitialData, useUserContext } from "../../hooks/UserContext";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { firebase_db } from "../../../firebaseConfig";

const SingleChatScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  //ALWAYS THIS PAGE SHOULD BE AS PART FROM ANOTHER SCREEN STACK
  let shown_user = { ...userInitialData };
  if (route.params.data) shown_user = route.params.data;
  const { _id, firstName, lastName, profile_url, speciality } = shown_user;
  //CURRENT USER
  const { user } = useUserContext();

  //HANDLING SEND MESSAGES SUBMIT
  const [message, setMessage] = useState("");
  const handleMessageChange = (message: string) => setMessage(message);
  const submitMessage = () => {
    if (!message) alert("Cannot be empty!");
    else alert(message);
  };

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
          </View>
        </View>
      ),
    });
  }, [shown_user]);
  //END OF HANDLING LAYOUT HEADER
  //-------------------------------

  //-------------------------------
  //START OF HANDLING MESSAGES
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

  const getMessages = async () => {
    const combined_id = user._id > shown_user._id ? user._id + shown_user._id : shown_user._id + user._id; //constant way to store key
    const exists = checkIfChatExists(combined_id);
  };

  //On page load getAllMessges between two users
  useEffect(() => {
    getMessages();
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: _id,
          name: `${firstName} ${lastName}`,
          avatar: profile_url,
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    alert(JSON.stringify({ _id, createdAt, text, user }));
    try {
      const docRef = await addDoc(collection(firebase_db, "chats"), { _id, createdAt, text, user });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  //END OF HANDLING MESSAGES
  //-------------------------------

  //FORM PARAM
  const data = {
    message,
    handleMessageChange,
    submitMessage,
  };

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full flex-1 justify-between pt-3">
        <View className="w-full">
          {messages.length === 0 ? (
            <Text className="text-center mt-10">Say Hello! &#128075;</Text>
          ) : (
            <View className="h-full">
              <GiftedChat
                messages={messages}
                renderAvatar={() => null}
                onSend={(messages: any) => onSend(messages)}
                user={{
                  _id: user._id,
                  name: `${user.firstName} ${user.lastName}`,
                  avatar: user.profile_url,
                }}
              />
            </View>
          )}
        </View>

        {/* <SendMessageFormComponent {...data} /> */}
      </View>
    </View>
  );
};

export default SingleChatScreen;
