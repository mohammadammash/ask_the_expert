import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
//internal imports:
import { COLORS } from "../../../constants";
import ChartsUpperTitleComponent from "./Common/ChartsUpperTitle";

//HARD CODED DATA:
const chatsData = [
  { value: 0, dataPointText: "0" },
  { value: 10, dataPointText: "10" },
  { value: 8, dataPointText: "8" },
  { value: 58, dataPointText: "58" },
  { value: 56, dataPointText: "56" },
  { value: 78, dataPointText: "78" },
  { value: 74, dataPointText: "74" },
];
const appointmentsData = [
  { value: 0, dataPointText: "0" },
  { value: 20, dataPointText: "20" },
  { value: 18, dataPointText: "18" },
  { value: 40, dataPointText: "40" },
  { value: 36, dataPointText: "36" },
  { value: 60, dataPointText: "60" },
  { value: 54, dataPointText: "54" },
];
const AppointmentsStatistics = () => {

  //MAIN COMPONENT
  return (
    <View style={{ backgroundColor: COLORS.dark, width: 330 }} className="rounded-xl mx-5">
      <ChartsUpperTitleComponent chart_type='AppointmentsChart'/>
      <LineChart
        data={chatsData}
        data2={appointmentsData}
        height={250}
        width={270}
        showVerticalLines
        spacing={45}
        initialSpacing={0}
        color1={COLORS.blue}
        color2={COLORS.orange}
        textColor1="white"
        textColor2="white"
        xAxisThickness={2}
        yAxisThickness={2}
        verticalLinesThickness={0}
        yAxisTextStyle={{ color: COLORS.grey }}
        xAxisLabelTextStyle={{ color: COLORS.grey }}
        xAxisLabelTexts={["", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="blue"
        dataPointsColor2="red"
        textShiftY={-5}
        textShiftX={-6}
        textFontSize={10}
      />
    </View>
  );
};

export default AppointmentsStatistics;
