import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import { SendMessageFormComponent } from "../../components";
import styles from "../../../styles";
import { userType } from "../../hooks/UserContext";

const SingleChatScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  //ALWAYS THIS PAGE SHOULD BE AS PART FROM ANOTHER SCREEN STACK
  let user;
  if (route.params.data) user = route.params.data;
  const { firstName, lastName, profile_url, speciality } = user;

  //HANDLING SEND MESSAGES SUBMIT
  const [message, setMessage] = useState("");
  const handleMessageChange = (message: string) => setMessage(message);
  const submitMessage = () => {
    if (!message) alert("Cannot be empty!");
    else alert(message);
  };

  //HANDLING LAYOUT HEADER
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
            <Text style={styles.white_text} className="text-[10px] opacity-80">
              {speciality}
            </Text>
          </View>
        </View>
      ),
    });
  }, [user]);

  //-------------------------------
  //START OF HANDLING MESSAGES
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
        },
      },
    ]);

  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
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
                  _id: 1,
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
