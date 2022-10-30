import { View, Text } from "react-native";
//internal
import { COLORS } from "../../../../constants";

interface ChartsUpperTitleProps {
  chart_type: string,
  dot1_title: string,
  dot2_title: string,
}

const ChartsUpperTitle: React.FC<ChartsUpperTitleProps> = ({ chart_type, dot1_title, dot2_title }): JSX.Element => {
  const firstDotColor = chart_type === "newUsers" ? "#BDB2FA" : COLORS.orange;
  const chartTitle =  chart_type === "newUsers" ? "New Users" : "New Appointments And Chats";

  return (
    <View className="my-8">
      <Text className="text-white text-xl font-bold text-center">{chartTitle}</Text>
      <View className="flex-row justify-evenly mt-6">
        <View className="flex-row items-center">
          <View style={{ backgroundColor: firstDotColor }} className="h-3 w-3 rounded-md mr-2" />
          <Text style={{ color: COLORS.grey }} className="text-sky-5">
            {dot1_title}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="h-3 w-3 rounded-md mr-2 bg-[#006DFF]" />
          <Text style={{ color: COLORS.grey }} className="h-4">
            {dot2_title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChartsUpperTitle;
