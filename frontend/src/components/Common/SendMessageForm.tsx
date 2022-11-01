import { View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
//internal imports
import { COLORS } from "../../constants";
import styles from "../../../styles";
import { sendMessageFormProps } from "./types";

const SendMessageForm: React.FC<sendMessageFormProps> = ({ message, handleMessageChange, submitMessage }) => {
  return (
    <View style={{ backgroundColor: COLORS.grey }} className="flex-row h-20 items-center justify-around">
      <TextInput
        value={message}
        onChangeText={(v)=>handleMessageChange(v)}
        style={[styles.text_input, styles.send_message_input]}
        className="ml-1 w-5/6 placeholder:pl-3"
        placeholder="Write your message"
      />
      <View className="mr-3">
        <FontAwesome name="send" size={24} color={COLORS.blue} onPress={submitMessage} />
      </View>
    </View>
  );
};

export default SendMessageForm;
