import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, Image } from "react-native";
import { useState, useEffect } from "react";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ROUTES, USERTYPES, IMAGES } from "../../constants";
import styles from "../../../styles";
import { useUserContext } from "../../hooks/UserContext";

const AppointmentsScreen = () => {
  const navigation = useNavigation<any>();

  //Handle appointment card buttons interaction
  //if type === 'chat' send the user in data,if remove => send appointment_id in data
  const handleAppointmentClick = (type: string, data: any) => {
    if (type === "chat") navigation.navigate(ROUTES.USER_SINGLE_CHAT, { data });
    else if (type === "remove") alert(JSON.stringify({ remove: "removeieto", appointment_id: data }, null, 2));
  };

  //---------------------------------------
  //START OF SHOW CURRENT USER APPOINTMENTS
  const { user, setUser } = useUserContext();
  const { user_type } = user;
  const [myAppointments, setMyAppointments] = useState<any>([]);
  useEffect(() => {
    const now = new Date();
    setMyAppointments([]);
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
  }, []);
  //END OF SHOW CURRENT USER APPOINTMENTS
  //---------------------------------------

  //------------------
  //MAIN COMPONENT
  if (myAppointments.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center w-3/4 text-xs mt-5 bold">You have no appointments 😴</Text>
        <Image className="w-64 h-64" source={IMAGES.emptyMyAppointmentsPage} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
        {myAppointments?.map((app: any, index: number) => {
          return (
            <ChatAndAppointmentCardComponent key={index} data={app} currentUser_type={user_type} handleAppointmentClick={handleAppointmentClick} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;
