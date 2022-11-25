import { TextInput, Text, Pressable, View } from "react-native";
import RadioButton from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
//internal
import { COLORS } from "../../constants";
import styles from "../../../styles";
import { BookFormValuesTypes, BookAppointmentFormCardProps } from "./types";
import noviceStyles from "./novice.styles";
import { color } from "react-native-reanimated";

//FORMIK
const appointmentIntialValues: BookFormValuesTypes = {
  notes: "",
  appointment_id: "",
};

//MAIN COMPONENT
const BookAppointmentFormCard: React.FC<BookAppointmentFormCardProps> = ({
  selectedAppointmentId,
  handleSubmitButtonTouched,
  submitButtonTouched,
  data,
  handleSubmitAppointmentId,
  handleFormSubmit,
  colorScheme,
  textcolor_style,
}) => {
  return (
    <Formik
      initialValues={appointmentIntialValues}
      onSubmit={(values) => {
        handleSubmitButtonTouched(true);
        if (!selectedAppointmentId) return;
        values.appointment_id = selectedAppointmentId;
        handleFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View className="items-center">
          <RadioButton
            data={data}
            style={noviceStyles.radioButton}
            boxStyle={[noviceStyles.radioButtonBox, colorScheme === "dark" && noviceStyles.radioButtonBoxDark]}
            textStyle={[noviceStyles.radioButtonText, colorScheme === "dark" && noviceStyles.radioButtonTextDark]}
            selectedBtn={(e) => handleSubmitAppointmentId(e.appointment_id)}
            icon={<Icon name="check-circle" size={25} color={COLORS.blue} />}
          />
          {submitButtonTouched && !selectedAppointmentId && <Text className="text-red-600 mt-2">Time Should be Specified</Text>}

          <TextInput
            onChangeText={handleChange("notes")}
            onBlur={handleBlur("notes")}
            value={values.notes}
            className=" placeholder:px-2 h-32 border-2 mt-8 w-5/6 rounded-lg"
            placeholder="Any notes to prepare for the meeting"
            placeholderTextColor={textcolor_style.color}
            style={[textcolor_style, colorScheme === "dark" && textcolor_style && styles.border_grey]}
            multiline={true}
            maxLength={100}
            numberOfLines={15}
          />

          <Pressable className="my-8 flex-row" style={styles.blue_button_lg} onPress={handleSubmit}>
            <FontAwesome name="calendar-check-o" size={20} color="white" />
            <Text className="font-bold text-base ml-2" style={styles.white_text}>
              BOOK
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default BookAppointmentFormCard;
