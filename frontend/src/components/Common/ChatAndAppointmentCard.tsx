import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
//internal imports
import styles from "../../../styles";
import { ROUTES, IMAGES } from "../../constants";

const ChatAndAppointmentCard = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.bg_grey_opacity30}
      onPress={() => navigation.navigate(ROUTES.NOVICE_PROFILE)}
    >
      <View>
        <Image source={IMAGES.dummyProfile} />
      </View>

      <View>
        <View>
          <Text>Mohammad Ammash</Text>
          <Text>Senior Web Developer</Text>
        </View>
        <View>
          <Text>Last msg 10chars..</Text>
          <Text>1d</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatAndAppointmentCard;
