import { View, Text } from "react-native";
//internal
import { COLORS } from "../../../constants";
import { t } from "i18next";

interface ChartsUpperLegendProps {
  chart_type: string;
  dot1_title: string;
  dot2_title: string;
}

const ChartsUpperLegend: React.FC<ChartsUpperLegendProps> = ({ chart_type, dot1_title, dot2_title }): JSX.Element => {
  //translation
  const new_users_string = t("New Users");
  const new_appointments_string = t("New Appointments And Chats");
  
  const firstDotColor = chart_type === "new Users" ? "#BDB2FA" : COLORS.orange;
  const chartTitle = chart_type === "new Users" ? new_users_string : new_appointments_string;

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

export default ChartsUpperLegend;
