import { View, Text, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
//internal imports
import { COLORS } from "../../constants";
import styles from "../../../styles";
import AddReviewModalForm from "./AddReviewModalForm";

const AddReviewButtonSection = () => {
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
            backgroundColor: 'rgba(255,255,255,0.9)',
          },
          draggableIcon: {
            backgroundColor: COLORS.dark,
          },
          container: {
            borderTopWidth: 2,
            borderColor: COLORS.dark,
            alignItems: 'center',
          },
        }}
      >
          <Text>How was Your Experience with Ahmad?</Text>
          <AddReviewModalForm />
      </RBSheet>
    </View>
  );
};

export default AddReviewButtonSection;
