import { View, Text, Pressable } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { useState } from "react";
import { Formik } from "formik";
//internal imports
import commonStyles from "./common.styles";
import styles from "../../../styles";
import { availability_options, session_time_options } from "./helpers/confirmAvailabilityDropdownDataHelper";
import { availabilityIntialValues, validateSetAvailabilityForm } from "./helpers/confirmAvailabilityFormHelper";

const ConfirmAvailabilityFormCard = () => {
  const [selectedMeetingsTime, setSelectedMeetingsTime] = useState('0');
  const [selectedSingleSessionTime, setSelectedSingleSessionTime] = useState('0');

  return (
    <View className="h-3/4 w-5/6 border justify-around rounded-xl">
      <Formik
        initialValues={availabilityIntialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validateSetAvailabilityForm}
      >
        
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <>
            <View className="px-2">
              <View className="flex-row justify-around items-center">
                <Text className="text-xs pl-3 w-1/2">Available from now till the upcoming: </Text>
                <SelectCountry
                  style={commonStyles.dropdown}
                  selectedTextStyle={commonStyles.selectedTextStyle}
                  placeholderStyle={commonStyles.placeholderStyle}
                  iconStyle={commonStyles.iconStyle}
                  maxHeight={200}
                  value={selectedMeetingsTime}
                  data={availability_options}
                  valueField="value"
                  labelField="label"
                  imageField=""
                  placeholder="Start Time"
                  searchPlaceholder="Search..."
                  onChange={(e) => {
                    setSelectedMeetingsTime(e.value);
                    values.meetings_time = e.value;
                    alert(values.meetings_time);
                  }}
                />
              </View>
              {errors.meetings_time && touched.meetings_time && <Text className="text-red-600  text-center">{errors.meetings_time}</Text>}

              <View className="flex-row justify-around items-center">
                <Text className="text-xs pl-3 w-1/2">Session/Meeting time:</Text>
                <SelectCountry
                  style={commonStyles.dropdown}
                  selectedTextStyle={commonStyles.selectedTextStyle}
                  placeholderStyle={commonStyles.placeholderStyle}
                  iconStyle={commonStyles.iconStyle}
                  maxHeight={200}
                  value={selectedSingleSessionTime}
                  data={session_time_options}
                  valueField="value"
                  labelField="label"
                  imageField=""
                  placeholder="Session Time"
                  searchPlaceholder="Search.."
                  onChange={(e) => {
                    setSelectedSingleSessionTime(e.value);
                    values.single_session_time = e.value;
                  }}
                />
              </View>
              {errors.single_session_time && touched.single_session_time && <Text className="text-red-600 text-center">{errors.single_session_time}</Text>}

              <Text className="text-center text-xs mt-3 color-[#828282]">Confirm your availability from now till the upcoming X hours for Y sessions/appointments</Text>
            </View>
            <View className="items-center">
              <Pressable style={styles.blue_button_lg} onPress={handleSubmit}>
                <Text className="text-xl text-white font-bold">SIGN UP</Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ConfirmAvailabilityFormCard;
              