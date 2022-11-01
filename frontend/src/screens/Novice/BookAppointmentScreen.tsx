import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
//internal imports
import { BookAppointmentFormCardComponent } from "../../components";
import { COLORS } from "../../constants";

const BookAppointmentScreen = () => {
  //START OF FORM HANDLE DATA
  const data = [
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
    {
      label: "12:15pm 12:30pm",
      start_timestamp: "1",
      end_timestamp: "2",
    },
  ];
  type selectedTimeStateType = {
    start_timestamp: string;
    end_timestamp: string;
  };
  const selectedTimeStateInitialValues: selectedTimeStateType = {
    start_timestamp: "",
    end_timestamp: "",
  };
  const [selectedTimeStamps, setSelectedTimeStamp] = useState<selectedTimeStateType>(selectedTimeStateInitialValues);
  const [submitButtonTouched, setSubmitButtonTouched] = useState<boolean>(false);
  const handleSubmitButtonTouched = (value: boolean) => setSubmitButtonTouched(value);
  const handleSubmitTimeStamps = (value: selectedTimeStateType) => setSelectedTimeStamp(value);

  interface formValues {
    notes: string;
    start_timestamp: string;
    end_timestamp: string;
  }
  const handleFormSubmit = (values: formValues) => {
    alert(JSON.stringify(values, null, 2));
  };
  //END OF FORM HANDLE DATA

  // params
  const dataParams = {
    selectedTimeStamps,
    handleSubmitButtonTouched,
    submitButtonTouched,
    data,
    handleSubmitTimeStamps,
    handleFormSubmit,
  };

  return (
    <View className="flex-1 w-full items-center justify-evenly bg-white border">
      <View className="w-full items-center h-1/6 gap-5">
        <Text style={{ color: COLORS.blue }} className="text-slate-800 font-bold text-lg text-center">
          Your Career Advice Is One Click Away
        </Text>
        <Text className="text-center w-3/4 text-xs color-[#828282]">
          Choose the available appointment time, and make sure to be there on time. A short timespan for a huge boost.
        </Text>
      </View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full h-4/6 min-h-3/5 items-center">
        <ScrollView className="w-5/6 border-2 rounded-xl">
          <BookAppointmentFormCardComponent {...dataParams} />
        </ScrollView>
      </View>
    </View>
  );
};

export default BookAppointmentScreen;
