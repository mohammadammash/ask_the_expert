import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
//internal imports
import { BookAppointmentFormCardComponent } from "../../components";
import { BookFormValuesTypes } from "../../components/Novice/types";
import styles from "../../../styles";
import { IMAGES, ROUTES } from "../../constants";
import { useBookAppointment } from "../../hooks/useNovice";
import { useUserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
import TurnUTCToLocateTimeHelper from "../Helpers/TurnUTCToLocalTimeHelper";
import { t } from "i18next";

const BookAppointmentScreen = ({ route }: { route: any }) => {
  //translation
  const noappointments_string = t("All Appointments Got Reserved");
  const bookapp_maintitle = t("Your Career Advice Is One Click Away");
  const bookapp_title = t("Choose the available appointment time, and make sure to be there on time. A short timespan for a huge boost.");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;

  //-------------------------------------
  //START OF APPOINTMENTS ADD DATA FORM LOGIC
  let { appointments_groups } = route.params;
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
            const st = TurnUTCToLocateTimeHelper(start_timestamp);
            const end = TurnUTCToLocateTimeHelper(end_timestamp);
            setData((prev: any) => [...prev, { label: `${st} ${end}`, appointment_id: app._id }]);
          }
        }
      }
    }
  }, [appointments_groups]);
  //-------------------------------------
  //END OF APPOINTMENTS ADD DATA FORM LOGIC

  //-------------------------------------
  //START OF FORM HANDLE DATA
  const navigation = useNavigation<any>();
  const { user, setUser } = useUserContext();
  const { data: mutateBookAppointmentData, mutate: mutateBookAppointment } = useBookAppointment();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [submitButtonTouched, setSubmitButtonTouched] = useState<boolean>(false);
  const handleSubmitButtonTouched = (value: boolean) => setSubmitButtonTouched(value);
  const handleSubmitAppointmentId = (value: string) => setSelectedAppointmentId(value);
  const handleFormSubmit = (values: BookFormValuesTypes) => {
    mutateBookAppointment(values);
  };
  useEffect(() => {
    if (mutateBookAppointmentData) {
      //UPDATE USER APPOINTMENTS INSTANTLY
      const { expert_device_token, expert, ...data } = mutateBookAppointmentData.data;
      data.expert_id = { ...expert };
      const appointments = user.appointments;
      appointments?.push(data);
      setUser({ ...user, appointments });
      //Remove app from data shown
      //remove app from shown_expert
      for (let grp of appointments_groups) {
        for (let app of grp.appointments) {
          if (app._id === data._id) app.isReserved = true;
        }
      }
      setData((prev: any) => prev.filter((app: any) => !(app.appointment_id === data._id)));
      //Redirect to own user appointments page
      navigation.navigate(ROUTES.APPOINTMENTS_STACK);
      navigation.popToTop(); //get stack back to home page
    }
  }, [mutateBookAppointmentData]);
  //END OF FORM HANDLE DATA
  //-------------------------------------

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
      <View style={bgcolor_style} className="flex-1 justify-center items-center">
        <Text style={textcolor_style} className="text-center w-3/4 text-xs mt-5 font-bold">{noappointments_string} &#9785;</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyAppointments} />
      </View>
    );
  }

  return (
    <ScrollView
      style={bgcolor_style}
      contentContainerStyle={{ alignContent: "center", justifyContent: "space-evenly" }}
      className="flex-1 w-full border"
    >
      <View className="w-full items-center my-10">
        <Text style={styles.blue_text} className="text-slate-800 font-bold text-lg text-center">
          {bookapp_maintitle}
        </Text>
        <Text style={textcolor_style} className="text-center w-3/4 text-xs mt-5 opacity-40">{bookapp_title}</Text>
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
