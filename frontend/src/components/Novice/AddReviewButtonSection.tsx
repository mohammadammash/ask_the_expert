import { View, Text, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
//internal imports
import { COLORS, ROUTES } from "../../constants";
import styles from "../../../styles";


const AddReviewButtonSection = () => {
  const navigation = useNavigation<any>();
  const refRBSheet = useRef();

  return (
    <View className="items-center">
      {/* SHOW REVIEW */}
      <Pressable style={styles.blue_button_lg} onPress={() => refRBSheet.current?.open()}>
        <Text className="font-bold text-lg" style={{ color: COLORS.white }}>
          ADD REVIEW
        </Text>
      </Pressable>

      {/* REVIEW BOTTOM SHEET/MODAL CONTENT */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: COLORS.dark,
          },
          container: {
            borderTopWidth: 2,
            borderColor: COLORS.dark,
          },
        }}
      >
        <View>
          <Text>How was Your Experience with Ahmad?</Text>

        </View>
      </RBSheet>
    </View>
  );
};

export default AddReviewButtonSection;
