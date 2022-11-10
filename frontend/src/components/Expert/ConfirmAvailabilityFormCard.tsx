import { View, Text, Pressable } from "react-native";
import { Formik } from "formik";
import { SelectCountry } from "react-native-element-dropdown";
//internal imports
import commonStyles from "../Common/common.styles";
import styles from "../../../styles";
import { availabilityIntialValues, validateSetAvailabilityForm } from "./Helpers/ConfirmAvailabilityFormHelper";
import { AVAILABILITY_SESSION_OPTIONS, AVAILABILITY_OPTIONS } from "../../constants";
import { ConfirmAvailabilityFormCardProps } from "./types";

const ConfirmAvailabilityFormCard: React.FC<ConfirmAvailabilityFormCardProps> = ({
  handleSubmitForm,
  unmatchedOptions,
}) => {
  return (
    <Formik
      initialValues={availabilityIntialValues}
      onSubmit={(values) => {
        handleSubmitForm(values);
      }}
      validationSchema={validateSetAvailabilityForm}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <>
          <View className="px-2 h-1/2">
            <View className="flex-row justify-around items-center">
              <Text className="text-xs pl-3 w-1/2">Available from now till the upcoming: </Text>
              <SelectCountry
                style={commonStyles.dropdown}
                selectedTextStyle={commonStyles.selectedTextStyle}
                placeholderStyle={commonStyles.placeholderStyle}
                iconStyle={commonStyles.iconStyle}
                maxHeight={200}
                value={values.meetings_time}
                data={AVAILABILITY_OPTIONS}
                valueField="value"
                labelField="label"
                imageField=""
                placeholder={values.meetings_time ? values.meetings_time : "Meetings Time"}
                searchPlaceholder="Search..."
                onChange={(e) => {
                  values.meetings_time = e.value;
                }}
              />
            </View>
            {errors.meetings_time && touched.meetings_time && (
              <Text className="text-red-600  text-center text-[11px] px-5">{errors.meetings_time}</Text>
            )}

            <View className="flex-row justify-around items-center">
              <Text className="text-xs pl-3 w-1/2">Session/Meeting time:</Text>
              <SelectCountry
                style={commonStyles.dropdown}
                selectedTextStyle={commonStyles.selectedTextStyle}
                placeholderStyle={commonStyles.placeholderStyle}
                iconStyle={commonStyles.iconStyle}
                maxHeight={200}
                value={values.single_session_time}
                data={AVAILABILITY_SESSION_OPTIONS}
                valueField="value"
                labelField="label"
                imageField=""
                placeholder={values.single_session_time ? values.single_session_time : "Session Time"}
                searchPlaceholder="Search.."
                onChange={(e) => {
                  values.single_session_time = e.value;
                }}
              />
            </View>
            {errors.single_session_time && touched.single_session_time && (
              <Text className="text-red-600 text-center text-[11px] px-5">{errors.single_session_time}</Text>
            )}
          </View>

          {unmatchedOptions && <Text className="text-red-600 text-center text-[11px] px-5">Choose compatible time options! </Text>}
          <View className="items-center h-1/2 justify-evenly px-3">
            <Text className="text-center text-xs mt-3 color-[#828282]">
              Confirm your availability from now till the upcoming {values.meetings_time / 60} hour/s for{" "}
              {values.meetings_time / values.single_session_time < 1
                ? Math.ceil(values.meetings_time / values.single_session_time)
                : Math.floor(values.meetings_time / values.single_session_time)}{" "}
              sessions/appointments
            </Text>
            <Pressable style={styles.blue_button_lg} onPress={handleSubmit}>
              <Text className="text-xl text-white font-bold">SIGN UP</Text>
            </Pressable>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ConfirmAvailabilityFormCard;
