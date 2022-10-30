import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
//internal imports
import ChartsLowerLegendComponent from "./Common/ChartsLowerLegend";
//HARD CODED DATA
const pieData = [
  { value: 67, color: "#009FFF", gradientCenterColor: "#006DFF", focused: true },
  { value: 33, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
];


const AllUsersCountChart = () => {
  return (
    <View className="bg-[#34448B] flex-1 items-center justify-center rounded-2xl mx-5">
      <View className="rounded-2xl m-7 p-4 bg-[#232B5D]">
        <Text className="text-white text-base font-bold">Performance</Text>
        <View className="items-center p-5">
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => (
              <View className="justify-center items-center">
                <Text className="text-xl text-white font-bold">67%</Text>
                <Text className="text-base text-white">Experts</Text>
              </View>
            )}
          />
        </View>
        <ChartsLowerLegendComponent novices_total={121} experts_total={59} users_total={180} />
      </View>
    </View>
  );
};

export default AllUsersCountChart;
