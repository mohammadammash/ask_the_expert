import { TextInput, Text, Pressable, View } from "react-native";
import RadioButton from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
//internal
import { COLORS } from "../../constants";
import styles from "../../../styles";
import {BookFormValuesTypes, BookAppointmentFormCardProps} from "./types";


//FORMIK
const appointmentIntialValues: BookFormValuesTypes = {
  notes: "",
  start_timestamp: "",
  end_timestamp: "",
};

//MAIN COMPONENT
const BookAppointmentFormCard: React.FC<BookAppointmentFormCardProps> = ({
  selectedTimeStamps,
  handleSubmitButtonTouched,
  submitButtonTouched,
  data,
  handleSubmitTimeStamps,
  handleFormSubmit,
}) => {
  return (
    <Formik
      initialValues={appointmentIntialValues}
      onSubmit={(values) => {
        handleSubmitButtonTouched(true);
        if (!selectedTimeStamps.start_timestamp) return;
        [values.start_timestamp, values.end_timestamp] = [selectedTimeStamps.start_timestamp, selectedTimeStamps.end_timestamp];
        handleFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View className="items-center">
          <RadioButton
            data={data}
            style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly", marginTop: 10 }}
            boxStyle={{ width: "40%", justifyContent: "space-evenly" }}
            textStyle={{ marginLeft: 10, fontSize: 12 }}
            selectedBtn={(e) => handleSubmitTimeStamps({ start_timestamp: e.start_timestamp, end_timestamp: e.end_timestamp })}
            icon={<Icon name="check-circle" size={25} color={COLORS.blue} />}
          />
          {submitButtonTouched && !selectedTimeStamps.start_timestamp && <Text className="text-red-600 mt-2">Time Should be Specified</Text>}

          <TextInput
            onChangeText={handleChange("notes")}
            onBlur={handleBlur("notes")}
            value={values.notes}
            className=" placeholder:pl-3 h-20 border-2 mt-5 w-5/6 rounded-lg"
            placeholder="Clearify what "
            multiline={true}
            numberOfLines={10}
          />

          <Text className="my-5 font-bold">10/11/2022 12:15 pm</Text>
          <Pressable className="mb-5 flex-row" style={styles.blue_button_lg} onPress={handleSubmit}>
            <FontAwesome name="calendar-check-o" size={20} color="white" />
            <Text className="font-bold text-base ml-2" style={{ color: COLORS.white }}>
              BOOK
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default BookAppointmentFormCard;
