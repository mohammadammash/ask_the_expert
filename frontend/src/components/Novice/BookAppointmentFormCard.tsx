import { View, Text } from "react-native";
import RadioButton from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
//internal
import { COLORS } from "../../constants";

// HARD CODED DATA TO REMOVE LATER
const data = [
  {
    label: "12:15pm 12:30pm",
    value: "1",
  },
  {
    label: "12:15pm 12:30pm",
    value: "2",
  },
  {
    label: "12:15pm 12:30pm",
    value: "3",
  },
  {
    label: "12:15pm 12:30pm",
    value: "3",
  },
  {
    label: "12:15pm 12:30pm",
    value: "4",
  },
  {
    label: "12:15pm 12:30pm",
    value: "4",
  },
  {
    label: "12:15pm 12:30pm",
    value: "8",
  },
];

const BookAppointmentFormCard = () => {
  const [selectedTime, setSelectedTime] = useState(0);

  return (
    <RadioButton
      data={data}
      style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: 'space-evenly', marginTop: 10}}
      boxStyle={{width: '40%', justifyContent: 'space-evenly'}}
      textStyle={{marginLeft: 10, fontSize: 12}}
      selectedBtn={(e) => alert(e.value)}
      icon={<Icon name="check-circle" size={25} color={COLORS.blue} />}
    />
  );
};

export default BookAppointmentFormCard;
