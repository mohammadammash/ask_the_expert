import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { Entypo } from "@expo/vector-icons"; 
//internal imports:
import { ProfileImageCardComponent } from "../../components";
import { ROUTES, COLORS} from "../../constants";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const {firstName, lastName, user_type, email} = user;
  const shownuser_id = 22; //user_id

  return (
    <View className="flex-1 items-center bg-white">
      <ProfileImageCardComponent />
        <View className="w-full items-center justify-start gap-2">
          {/* PERSONAL INFO */}
          <View className="mb-2">
            <Text style={{ color: COLORS.blue }} className="font-bold text-2xl">
              {firstName} {lastName}
            </Text>
            <Text className="opacity-60 text-sm text-center">{email}</Text>
          </View>
          <Entypo name="shield" size={50} color="black" />
          <Text style={{ color: COLORS.dark }} className="text-base font-bold">
            ADMINSTRATOR
          </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
