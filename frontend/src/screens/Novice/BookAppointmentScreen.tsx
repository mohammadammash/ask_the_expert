import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
//internal imports
import { BookAppointmentFormCardComponent } from "../../components";
import { BookFormValuesTypes } from "../../components/Novice/types";
import styles from "../../../styles";
import { IMAGES } from "../../constants";

const BookAppointmentScreen = ({ route }: { route: any }) => {
  //-------------------------------------
  //START OF APPOINTMENTS ADD DATA FORM LOGIC
  const { appointments_groups } = route.params;
  const toLocateTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      // en-US can be set to 'default' to use user's browser settings
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (data.length === 0) {
      const now = new Date();
      for (let grp of appointments_groups) {
        for (let app of grp.appointments) {
          const start_timestamp = new Date(app.start_timestamp);
          if (!app.isReserved && start_timestamp > now) {
            //add it to radioButtons data
            const end_timestamp = new Date(app.end_timestamp);
            const st = toLocateTime(start_timestamp);
            const end = toLocateTime(end_timestamp);
            setData((prev: any) => [...prev, { label: `${st} ${end}`, appointment_id: app._id }]);
          }
        }
      }
    }
  }, [appointments_groups]);
  //-------------------------------------
  //END OF APPOINTMENTS ADD DATA FORM LOGIC

  //Form handle data
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [submitButtonTouched, setSubmitButtonTouched] = useState<boolean>(false);
  const handleSubmitButtonTouched = (value: boolean) => setSubmitButtonTouched(value);
  const handleSubmitAppointmentId = (value: string) => setSelectedAppointmentId(value);
  const handleFormSubmit = (values: BookFormValuesTypes) => {
    alert(JSON.stringify(values, null, 2));
  };

  // Params
  const dataParams = {
    selectedAppointmentId,
    handleSubmitButtonTouched,
    submitButtonTouched,
    data,
    handleSubmitAppointmentId,
    handleFormSubmit,
  };

  //--------------
  //MAIN COMPONENT
  //EMPTY STATE
  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center w-3/4 text-xs mt-5 bold">All Appointments got reserved ;(</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyAppointments} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ alignContent: "center", justifyContent: "space-evenly" }} className="flex-1 w-full bg-white border">
      <View className="w-full items-center my-10">
        <Text style={styles.blue_text} className="text-slate-800 font-bold text-lg text-center">
          Your Career Advice Is One Click Away
        </Text>
        <Text className="text-center w-3/4 text-xs mt-5 opacity-40">
          Choose the available appointment time, and make sure to be there on time. A short timespan for a huge boost.
        </Text>
      </View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full min-h-3/4 items-center">
        <View className="w-5/6 border-2 rounded-xl mb-10">
          <BookAppointmentFormCardComponent {...dataParams} />
        </View>
      </View>
    </ScrollView>
  );
};

export default BookAppointmentScreen;
