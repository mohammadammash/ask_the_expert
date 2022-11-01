import { Text, Pressable, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
//internal imports
import { COLORS } from "../../constants";
import styles from "../../../styles";
import AddReviewModalForm from "./AddReviewModalForm";
import { AddReviewButtonSectionProps } from "./types";

const AddReviewButtonSection: React.FC<AddReviewButtonSectionProps> = ({ modalRef }) => {
  return (
    <View className="items-center">
      {/* SHOW REVIEW */}
      <Pressable style={styles.blue_button_lg} onPress={() => modalRef.current?.open()}>
        <Text className="font-bold text-lg" style={{ color: COLORS.white }}>
          ADD REVIEW
        </Text>
      </Pressable>

      {/* REVIEW BOTTOM SHEET/MODAL CONTENT */}
      <RBSheet
        ref={modalRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(255,255,255,0.9)",
          },
          draggableIcon: {
            backgroundColor: COLORS.dark,
          },
          container: {
            borderTopWidth: 2,
            borderColor: COLORS.dark,
            alignItems: "center",
            height: "40%",
          },
        }}
      >
        <Text>How was Your Experience with Ahmad?</Text>
        <AddReviewModalForm modalRef={modalRef} />
      </RBSheet>
    </View>
  );
};

export default AddReviewButtonSection;
