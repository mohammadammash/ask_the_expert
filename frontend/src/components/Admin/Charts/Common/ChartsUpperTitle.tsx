import { View, Text } from "react-native";
//internal
import { COLORS } from "../../../../constants";

interface ChartsUpperTitleProps {
  chart_type: string;
}

const ChartsUpperTitle: React.FC<ChartsUpperTitleProps> = ({ chart_type }): JSX.Element => {
  return (
    <View className="my-8">
      <Text className="text-white text-xl font-bold text-center">New Appointments And Chats</Text>
      <View className="flex-row justify-evenly mt-6">
        <View className="flex-row items-center">
          <View style={{ backgroundColor: COLORS.orange }} className="h-3 w-3 rounded-md bg-[#BDB2FA] mr-2" />
          <Text style={{ color: COLORS.grey }} className="text-sky-5">
            118 Chat
          </Text>
        </View>

        <View className="flex-row items-center">
          <View style={{ backgroundColor: COLORS.blue }} className="h-3 w-3 rounded-md mr-2" />
          <Text style={{ color: COLORS.grey }} className="h-4">
            450 Appointments
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChartsUpperTitle;
