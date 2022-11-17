import { View, Text, Pressable } from "react-native";
import { Formik } from "formik";
import { SelectCountry } from "react-native-element-dropdown";
//internal imports
import commonStyles from "../Common/common.styles";
import styles from "../../../styles";
import { availabilityIntialValues, validateSetAvailabilityForm } from "./Helpers/ConfirmAvailabilityFormHelper";
import { AVAILABILITY_SESSION_OPTIONS, AVAILABILITY_OPTIONS } from "../../constants";
import { ConfirmAvailabilityFormCardProps } from "./types";
import { t } from "i18next";

const ConfirmAvailabilityFormCard: React.FC<ConfirmAvailabilityFormCardProps> = ({ handleSubmitForm, unmatchedOptions, textcolor_style }) => {
  //translation
  const available_string = t("Available from now till the upcoming:");
  const meetingstime_string = t("Meetings Time");
  const sessionlabel_string = t("Time Per Session");
  const sessiontime_string = t("Session Time");
  const optionserror_string = t("Choose compatible time options! ");
  const hoursfor_string = t("hour/s for");
  const confirmavb_string = t("Confirm your availability from now till the upcoming");
  const sessionsapp_string = t("sessions/appointments");
  const signup_string = t("sign up");
  
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
              <Text style={textcolor_style} className="text-xs pl-3 w-1/2">{available_string}</Text>
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
                placeholder={values.meetings_time ? values.meetings_time : meetingstime_string}
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
              <Text style={textcolor_style} className="text-xs pl-3 w-1/2">{sessionlabel_string}</Text>
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
                placeholder={values.single_session_time ? values.single_session_time : sessiontime_string}
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

          {unmatchedOptions && <Text className="text-red-600 text-center text-[11px] px-5">{optionserror_string}</Text>}
          <View className="items-center h-1/2 justify-evenly px-3">
            <Text className="text-center text-xs mt-3 color-[#828282]">
              {confirmavb_string} {values.meetings_time / 60} {hoursfor_string}{" "}
              {values.meetings_time / values.single_session_time < 1
                ? Math.ceil(values.meetings_time / values.single_session_time)
                : Math.floor(values.meetings_time / values.single_session_time)}{" "}
              {sessionsapp_string}
            </Text>
            <Pressable style={styles.blue_button_lg} onPress={handleSubmit}>
              <Text className="text-xl text-white font-bold capitalize">{signup_string}</Text>
            </Pressable>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ConfirmAvailabilityFormCard;
