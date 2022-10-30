import { View, Text, ScrollView } from "react-native";
//internal imports
import { BookAppointmentFormCardComponent } from "../../components";
import { COLORS } from "../../constants";

const BookAppointmentScreen = () => {
  return (
    <View className="flex-1 w-full items-center justify-evenly bg-white border">
      <View className="w-full items-center h-1/6 gap-5">
        <Text style={{ color: COLORS.blue }} className="text-slate-800 font-bold text-lg text-center">
          Your Career Advice Is One Click Away
        </Text>
        <Text className="text-center w-3/4 text-xs color-[#828282]">Choose the available appointment time, and make sure to be there on time. A short timespan for a huge boost.</Text>
      </View>

      {/* CONFIRM AVAILBILITY FORM */}
      <View className="w-full h-4/6 min-h-3/5 items-center">
        <ScrollView className="w-5/6 border-2 rounded-xl">
          <BookAppointmentFormCardComponent />
        </ScrollView>
      </View>
    </View>
  );
};

export default BookAppointmentScreen;
