import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image } from "react-native";
//internal imports
import { ROUTES, IMAGES, COLORS } from "../../constants";
import styles from "../../../styles";
import { SendMessageFormComponent } from "../../components";

const SingleChatScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full flex-1 justify-between pt-3">
        <View className="">
          {/* LEFT BUBBLE */}
          <View style={{ backgroundColor: COLORS.blue }} className="ml-2 min-w-1/2 w-3/5 max-w-3/4 min-h-8 p-2 rounded-2xl rounded-tl-none mb-2 flex-row">
            <Text className="w-5/6 text-white">
              Lorem psum dolor sit amet consectetur adipisicing elit. Earum iusto perspiciatis nisi placeat dignissimos temporibus saepe vero. Rerum, recusandae harum.
            </Text>
            <Text className="w-1/6 text-center text-[10px] opacity-75 text-white">11:59</Text>
          </View>

          {/* RIGHT BUBBLE */}
          <View className="items-end">
            <View style={{ backgroundColor: COLORS.grey }} className="mr-2 mb-2 w-3/5 min-w-1/2 max-w-3/4 min-h-8 p-2 rounded-2xl rounded-tr-none flex-row ">
              <Text className="w-5/6 ">Lorem psum dolor? Lorem psum dolor?</Text>
              <Text className="w-1/6 text-center text-[10px] opacity-75">11:59</Text>
            </View>
          </View>
        </View>

        <SendMessageFormComponent />
      </View>
    </View>
  );
};

export default SingleChatScreen;
