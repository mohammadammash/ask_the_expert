import { useIsFocused, useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, Image, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ROUTES, USERTYPES, IMAGES } from "../../constants";
import styles from "../../../styles";
import { useUserContext } from "../../hooks/UserContext";
import { useDeleteAppointment } from "../../hooks/useUser";
import { t } from "i18next";

const AppointmentsScreen = () => {
  //translation
  const appointmentremoved_string = t("Appointment is getting Removed");
  const noappointments_string = t("You Have No Appointments");
  
  const navigation = useNavigation<any>();
  const [removedAppointmentId, setRemovedAppointmentId] = useState("");
  const { user, setUser } = useUserContext();
  const { user_type } = user;
  const [myAppointments, setMyAppointments] = useState<any>([]);
  const isFocused = useIsFocused();

  //----------------------------------
  //START OF HANDLE REMOVE APPOINTMENT
  const {
    mutate: mutateRemoveAppointment,
    data: mutateRemoveAppointmentData,
    isLoading: mutateRemoveAppointmentDataIsLoading,
    isSuccess: mutateRemoveAppointmentDataIsSuccess,
  } = useDeleteAppointment();

  const handleRemoveAppointment = (appointment_id: string) => {
    Alert.alert("Remove Appointment", "\nAre you sure you want to Remove this appointment?", [
      {
        text: "Cancel",
        style: "destructive",
      },
      {
        text: "Submit",
        onPress: () => {
          setRemovedAppointmentId(appointment_id);
          mutateRemoveAppointment(appointment_id);
        },
        style: "default",
      },
    ]);
  };

  useEffect(() => {
    if (mutateRemoveAppointmentData && mutateRemoveAppointmentDataIsSuccess) {
      const { user_device_token } = mutateRemoveAppointmentData.data;
      //!!!!!!!!!SEND NOTIFICATION TO USERDEVICETOKEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const new_appointments = myAppointments.filter((app: any) => app._id !== removedAppointmentId); //update shown appointments
      setMyAppointments([...new_appointments]);
      setRemovedAppointmentId("");
      if (user_type === USERTYPES.NOVICE) {
        setUser({ ...user, appointments: new_appointments }); //update only user and appointments will be updated auto by bottom useEffect
      } else {
        //if expert
        const { appointments_groups } = user; //then update current expert appointment group
        for (let grp of appointments_groups) {
          const end_timestamp = new Date(grp.end_timestamp);
          const now = new Date();
          if (!grp.isActive || end_timestamp < now) continue; //user chosen to go unactive before it finished => so I ignore end_timestamp
          for (let app of grp.appointments) {
            if (app._id === removedAppointmentId) {
              app.isReserved = false;
              break;
            }
          }
        }
        setUser({ ...user, appointments_groups });
      }
    }
  }, [mutateRemoveAppointmentData]);
  //END OF HANDLE REMOVE APPOINTMENT
  //----------------------------------

  //Handle appointment card buttons interaction
  //if type === 'chat' send the user in data,if remove => send appointment_id in data
  const handleAppointmentClick = (type: string, data: any) => {
    if (type === "chat") navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data });
    else if (type === "remove") handleRemoveAppointment(data);
  };

  //---------------------------------------
  //START OF SHOW CURRENT USER APPOINTMENTS
  const updateShownAppointments = () => {
    const now = new Date();
    const appointments = [];
    //Get novice appointments
    if (user.user_type === USERTYPES.NOVICE && user.appointments) {
      for (let app of user.appointments) {
        const end_timestamp = new Date(app.end_timestamp);
        if (end_timestamp > now) {
          appointments.push(app);
        }
      }
      //Get expert appointments
    } else if (user.user_type === USERTYPES.EXPERT) {
      const { appointments_groups } = user;
      for (let grp of appointments_groups) {
        if (!grp.isActive) continue; //user chosen to go unactive before it finished => so I ignore end_timestamp
        for (let app of grp.appointments) {
          const end_timestamp = new Date(app.end_timestamp);
          if (end_timestamp > now && app.isReserved) {
            appointments.push(app);
          }
        }
      }
    }
    setMyAppointments([...appointments]);
  };
  useEffect(() => {
    //updateShown appointments everytime page is focused not only on render
    isFocused && updateShownAppointments();
  }, [isFocused]);
  //END OF SHOW CURRENT USER APPOINTMENTS
  //---------------------------------------

  //------------------
  //MAIN COMPONENT
  if (mutateRemoveAppointmentDataIsLoading && !mutateRemoveAppointmentDataIsSuccess) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="text-center w-3/4 text-xs mt-5 bold">{appointmentremoved_string} &#10006</Text>
      </View>
    );
  }

  if (myAppointments.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center w-3/4 text-xs font-bold">{noappointments_string} 😴</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyMyAppointments} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
        {myAppointments?.map((app: any, index: number) => {
          //conditionally set populated shown user data
          let shown_user;
          if (user_type === "novice") shown_user = app.expert_id;
          else shown_user = app.novice_id;
          return <ChatAndAppointmentCardComponent key={index} shown_user={shown_user} data={app} handleCardClick={handleAppointmentClick} />;
        })}
      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;
