import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
//internal imports
import ChartsLowerLegendComponent from "./Common/ChartsLowerLegend";

//HARD CODED DATA TESTING
const data = [
  { value: 2500, frontColor: "#BDB2FA", spacing: 0, label: "Jan" },
  { value: 2400, frontColor: "#006DFF" },

  { value: 3500, frontColor: "#BDB2FA", spacing: 0, label: "Feb" },
  { value: 3000, frontColor: "#006DFF" },

  { value: 4500, frontColor: "#BDB2FA", spacing: 0, label: "Mar" },
  { value: 4000, frontColor: "#006DFF" },

  { value: 5200, frontColor: "#BDB2FA", spacing: 0, label: "Apr" },
  { value: 4900, frontColor: "#006DFF" },

  { value: 3000, frontColor: "#BDB2FA", spacing: 0, label: "May" },
  { value: 5800, frontColor: "#006DFF" },

  { value: 2300, frontColor: "#BDB2FA", spacing: 0, label: "Jun" },
  { value: 2800, frontColor: "#006DFF" },
];

const FieldsStatistics = () => {
  return (
    <View style={{ width: 330 }} className="bg-[#34448B] flex-1 items-center justify-center rounded-2xl mr-5">
      <View className="w-5/6 rounded-2xl py-5 bg-[#232B5D]">
        <Text className="text-white text-base font-bold ml-2">Fields Users</Text>
        <BarChart
          data={data}
          barWidth={12}
          initialSpacing={10}
          spacing={10}
          barBorderRadius={4}
          yAxisThickness={0}
          xAxisType={"solid"}
          xAxisColor={"lightgray"}
          yAxisTextStyle={{ color: "lightgray" }}
          stepValue={1000}
          maxValue={6000}
          noOfSections={6}
          yAxisLabelTexts={["0", "1k", "2k", "3k", "4k", "5k", "6k"]}
          labelWidth={38}
          xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
          showLine
          lineConfig={{
            color: "transparent",
            hideDataPoints: true,
          }}
        />
        <ChartsLowerLegendComponent novices_total={40} experts_total={113} users_total={153} />
      </View>
    </View>
  );
};

export default FieldsStatistics;
