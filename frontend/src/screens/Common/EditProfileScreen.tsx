import { useNavigation } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import { EditProfileFormComponent, EditAdminProfileFormComponent } from "../../components";
import { USERTYPES } from "../../constants";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type } = user;

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center">{user_type === USERTYPES.ADMIN ? <EditAdminProfileFormComponent /> : <EditProfileFormComponent />}</View>
    </ScrollView>
  );
};

export default EditProfileScreen;
