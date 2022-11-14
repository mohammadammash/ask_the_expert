import { View, Text } from "react-native";
import { useState } from "react";
//internal imports
import { COLORS } from "../../constants";
import { SendMessageFormComponent } from "../../components";
import styles from "../../../styles";

const SingleChatScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  //--------------------------
  //START OF SEND MESSAGE FORM
  const [message, setMessage] = useState("");
  const handleMessageChange = (message: string) => setMessage(message);
  const submitMessage = () => {
    if (!message) alert("Cannot be empty!");
    else alert(message);
  };
  //END OF SEND MESSAGE FORM
  //------------------------

  //------------------------------------------------------------------------
  //START OF HANDLING MESSAGES DATA IF DIRECTLY FROM APPOINTMENTS OR PROFILE
  const [messages, setMessages] = useState([]);
  let user;
  if (route.params.data) user = route.params.data;
  if (user) {
    alert(JSON.stringify(user, null, 2));
    //UPDATE HEADER ADD IMAGE, name at least
    navigation.setOptions({ title: `${user.firstName} ${user.lastName}` });
  }
  //END OF HANDLING MESSAGES DATA IF DIRECTLY FROM APPOINTMENTS OR PROFILE
  //------------------------------------------------------------------------

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
            <>
              <View style={styles.bg_blue} className="ml-2 min-w-1/2 w-3/5 max-w-3/4 min-h-8 p-2 rounded-2xl rounded-tl-none mb-2 flex-row">
                <Text className="w-5/6 text-white">
                  Lorem psum dolor sit amet consectetur adipisicing elit. Earum iusto perspiciatis nisi placeat dignissimos temporibus saepe vero.
                  Rerum, recusandae harum.
                </Text>
                <Text className="w-1/6 text-center text-[10px] opacity-75 text-white">11:59</Text>
              </View>

              <View className="items-end">
                <View style={styles.bg_grey} className="mr-2 mb-2 w-3/5 min-w-1/2 max-w-3/4 min-h-8 p-2 rounded-2xl rounded-tr-none flex-row ">
                  <Text className="w-5/6 ">Lorem psum dolor? Lorem psum dolor?</Text>
                  <Text className="w-1/6 text-center text-[10px] opacity-75">11:59</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <SendMessageFormComponent {...data} />
      </View>
    </View>
  );
};

export default SingleChatScreen;
