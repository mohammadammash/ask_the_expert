import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
//internal imports
import { COLORS } from "../../../constants";
// HARD CODED DATA TO REMOVE
const barData = [
  {
    value: 40,
    label: "Jan",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 20, frontColor: "#006DFF" },
  {
    value: 50,
    label: "Feb",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 40, frontColor: "#006DFF" },
  {
    value: 75,
    label: "Mar",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 25, frontColor: "#006DFF" },
  {
    value: 30,
    label: "Apr",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 20, frontColor: "#006DFF" },
  {
    value: 60,
    label: "May",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 40, frontColor: "#006DFF" },
  {
    value: 65,
    label: "Jun",
    spacing: 2,
    labelWidth: 30,
    frontColor: "#BDB2FA",
  },
  { value: 30, frontColor: "#006DFF" },
];

const AppointmentsStatistics = () => {
  const renderTitle = () => {
    return (
      <View className="my-8">
        <Text className="text-white text-xl font-bold text-center">New Users</Text>
        <View className="flex-row justify-evenly mt-6">
          <View className="flex-row items-center">
            <View className="h-3 w-3 rounded-md bg-[#BDB2FA] mr-2" />
            <Text style={{ color: COLORS.grey }} className="text-sky-5">
              118 Novices
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="h-3 w-3 rounded-md bg-[#006DFF] mr-2" />
            <Text style={{ color: COLORS.grey }} className="h-4">
              1000 Experts
            </Text>
          </View>
        </View>
      </View>
    );
  };

  //MAIN COMPONENT
  return (
    <View style={{ backgroundColor: COLORS.dark }} className="rounded-xl mx-5">
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={2}
        yAxisThickness={2}
        yAxisTextStyle={{ color: COLORS.grey }}
        xAxisLabelTextStyle={{ color: COLORS.grey }}
        noOfSections={3}
        maxValue={150}
      />

      <View className="h-1/4 justify-center">
        <Text className="text-white text-md font-semibold text-center">1118 New Users</Text>
      </View>
    </View>
  );
};

export default AppointmentsStatistics;
