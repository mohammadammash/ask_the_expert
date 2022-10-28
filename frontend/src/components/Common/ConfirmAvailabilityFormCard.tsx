import { View, Text, Pressable } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import commonStyles from "./common.styles";
import { useState } from "react";
import styles from "../../../styles";

const availability_options = [
  {
    value: "30",
    label: "30 mins",
  },
  {
    value: "60",
    label: "1 hour",
  },
  {
    value: "90",
    label: "1hr 30mins",
  },
  {
    value: "120",
    label: "2hrs",
  },
  {
    value: "150",
    label: "2hrs 30mins",
  },
  {
    value: "180",
    label: "3hrs",
  },
  {
    value: "210",
    label: "3 hrs 30 mins",
  },
  {
    value: "240",
    label: "4hrs",
  },
];

const session_time_options = [
  {
    value: "15",
    label: "15 mins",
  },
  {
    value: "30",
    label: "30 mins",
  },
  {
    value: "45",
    label: "45 mins",
  },
  {
    value: "60",
    label: "1 hour",
  },
  {
    value: "90",
    label: "1 hour 30 mins",
  },
  {
    value: "120",
    label: "2 hours",
  },
];

const ConfirmAvailabilityFormCard = () => {
  const [country, setCountry] = useState("1");

  return (
    <View className="h-3/4 w-5/6 border justify-around rounded-xl">
      <View className="px-2">
        <View className="flex-row justify-around items-center">
          <Text className="text-xs pl-3 w-1/2">Available from now till the upcoming: </Text>
          <SelectCountry
            style={commonStyles.dropdown}
            selectedTextStyle={commonStyles.selectedTextStyle}
            placeholderStyle={commonStyles.placeholderStyle}
            iconStyle={commonStyles.iconStyle}
            maxHeight={200}
            value={country}
            data={availability_options}
            valueField="value"
            labelField="label"
            imageField=""
            placeholder="Start Time"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setCountry(e.value);
            }}
          />
        </View>

        <View className="flex-row justify-around items-center">
          <Text className="text-xs pl-3 w-1/2">Session/Meeting time:</Text>
          <SelectCountry
            style={commonStyles.dropdown}
            selectedTextStyle={commonStyles.selectedTextStyle}
            placeholderStyle={commonStyles.placeholderStyle}
            iconStyle={commonStyles.iconStyle}
            maxHeight={200}
            value={country}
            data={session_time_options}
            valueField="value"
            labelField="label"
            imageField=""
            placeholder="Session Time"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setCountry(e.value);
            }}
          />
        </View>

        <Text className="text-center text-xs mt-3 color-[#828282]">Confirm your availability from now till the upcoming X hours for Y sessions/appointments</Text>
      </View>

      <View className="items-center">
        <Pressable style={styles.blue_button_lg}>
          <Text className="text-xl text-white font-bold">SIGN UP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmAvailabilityFormCard;
