import { View, Text } from "react-native";

const BookAppointmentScreen = () => {
  return (
    <View className="flex-1 w-full items-center justify-evenly bg-white border">
      <View className="w-full items-center gap-5">
        <Text className="text-slate-800 text-xl text-center">Your Career Advice Is One Click Away</Text>
        <Text className="text-center w-3/4 text-xs color-[#828282]">Choose the available appointment time, and make sure to be there on time. A short timespan for a huge boost.</Text>
      </View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full items-center justify-around">
        <BookAppointmentScreen />
      </View>
    </View>
  );
};

export default BookAppointmentScreen;
