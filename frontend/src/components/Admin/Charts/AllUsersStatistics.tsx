import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";

const AllUsersCountChart = () => {
  const pieData = [
    { value: 67, color: "#009FFF", gradientCenterColor: "#006DFF", focused: true },
    { value: 33, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
  ];

  //LABEL DOT JSX
  const renderDot = (color: string): JSX.Element => <View className={`rounded-full h-3 w-3 mr-1`} style={{ backgroundColor: color }} />;

  // LEGEND DATA JSX
  const renderLegendComponent = () => {
    return (
      <>
        <View className="flex-row mb-3">
          <View className="flex-row mr-5 items-center">
            {renderDot("#006DFF")}
            <Text className="text-white">Experts: 121</Text>
          </View>
          <View className="flex-row ml-10 items-center">
            {renderDot("#8F80F3")}
            <Text className="text-white">Novices: 59</Text>
          </View>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row items-center justify-center w-32 mr-5">
            {renderDot("#3BE9DE")}
            <Text className="text-white">Users: 180</Text>
          </View>
        </View>
      </>
    );
  };

  // MAIN CHART
  return (
    <View className="bg-[#34448B] flex-1 items-center justify-center rounded-2xl">
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
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default AllUsersCountChart;
