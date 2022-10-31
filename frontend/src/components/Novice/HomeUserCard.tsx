import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
//internal imports
import styles from "../../../styles";
import { ROUTES, IMAGES, COLORS } from "../../constants";

const HomeUserCard = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity style={styles.shadow_bg} className="flex-row w-5/6 rounded-xl border-0.5 items-center justify-around h-1/5 mb-5" onPress={() => navigation.navigate(ROUTES.EXPERT_PROFILE)}>
      <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square max-w-1/4 max-h-1/4 h-1/4 w-1/4 rounded-full items-center border-2">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      
    </TouchableOpacity>
  );
};

export default HomeUserCard;
