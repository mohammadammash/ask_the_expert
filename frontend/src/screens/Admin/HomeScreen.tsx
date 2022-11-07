import { View, ScrollView, Text } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { AntDesign } from "@expo/vector-icons";
//internal imports
import { ChartsLowerLegendComponent, ChartsUpperLegendComponent } from "../../components";
import { COLORS } from "../../constants";
import styles from "../../../styles";

//HARD CODED DATA
const pieData = [
  { value: 67, color: "#009FFF", gradientCenterColor: "#006DFF", focused: true },
  { value: 33, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
];
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
const fields_Data = [
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

const HomeScreen = () => {
  return (
    <View style={styles.bg_dark} className="items-center justify-evenly flex-1 gap-1">
      <View>
        <ScrollView horizontal={true} className="flex-row">
          {/* START OF ALL USERS CHARTS */}
          <View className="bg-[#34448B] flex-1 items-center justify-center w-96">
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
              <View className="absolute right-0 h-full justify-center mr-1">
                <AntDesign name="rightcircle" size={24} color={COLORS.white} />
              </View>
            </View>
          </View>
          {/* END OF ALL USERS CHARTS */}

          {/* START OF NEW USERS CHART */}
          <View style={styles.bg_dark} className="w-96 items-center justify-center">
            <View>
              <ChartsUpperLegendComponent chart_type="newUsers" dot1_title={"118 Expert"} dot2_title={"1000 Novice"} />
              <BarChart
                data={barData}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={2}
                yAxisThickness={2}
                yAxisTextStyle={styles.grey_text}
                xAxisLabelTextStyle={styles.grey_text}
                noOfSections={3}
                maxValue={150}
              />
              <View className="h-1/4 justify-center">
                <Text className="text-white text-md font-semibold text-center">1118 New Users</Text>
              </View>
              <View className="absolute right-0 h-full justify-center mr-1">
                <AntDesign name="rightcircle" size={24} color={COLORS.white} />
              </View>
            </View>
          </View>
          {/* END OF NEW USERS CHART */}

          {/* START OF FIELDS STATISTICS CHART */}
          <View className="bg-[#34448B] flex-1 items-center justify-center w-96">
            <View className="rounded-2xl m-7 p-4 bg-[#232B5D]">
              <Text className="text-white text-base font-bold ml-2">Fields Users</Text>
              <BarChart
                data={fields_Data}
                barWidth={12}
                initialSpacing={10}
                spacing={10}
                barBorderRadius={4}
                yAxisThickness={0}
                xAxisType={"solid"}
                xAxisColor={"lightgray"}
                yAxisTextStyle={styles.grey_text}
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
              <View className="absolute right-0 h-full justify-center mr-1">
                <AntDesign name="rightcircle" size={24} color={COLORS.white} />
              </View>
            </View>
          </View>
          {/* END OF FIELDS STATISTICS CHART */}

          {/* START OF APPOINTMENTS AND NEW STATISTICS CHART */}
          <View style={styles.bg_dark} className="w-96 items-center justify-center">
            <View>
              <ChartsUpperLegendComponent chart_type="AppointmentsAndChats" dot1_title={"116 Chat"} dot2_title={"432 Appointment"} />
              <LineChart
                data={chatsData}
                data2={appointmentsData}
                height={250}
                width={300}
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
                yAxisTextStyle={styles.grey_text}
                xAxisLabelTextStyle={styles.grey_text}
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
          </View>
          {/* END OF APPOINTMENTS AND NEW STATISTICS CHART */}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
