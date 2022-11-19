import { View, ScrollView, Text } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { AntDesign } from "@expo/vector-icons";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
//internal imports
import { ChartsLowerLegendComponent, ChartsUpperLegendComponent, ActivityIndicatorComponent } from "../../components";
import { COLORS } from "../../constants";
import styles from "../../../styles";
import { useGetAllUsersWithStatistics } from "../../hooks/useAdmin";
import CalculateUserStatsHelper from "./Helpers/CalculateUsersStatsHelper";
import CalculateChatsAndAppointmentsStatsHelper from "./Helpers/CalculateChatsAndAppointmentsStatsHelper";
import getChatsStatsFromFirestore from "../Helpers/GetChatsStatsFromFirestoreHelper";
import { removeAuthToken } from "../../networks/base";
import { userInitialData, useUserContext } from "../../hooks/UserContext";

//--------------------------
const HomeScreen = () => {
  //translation
  const experts_string = t("experts");
  const novices_string = t("novices");
  const newusers_string = t("new users");
  const novice_string = t("Novice");
  const chats_string = t("Chats");
  const appointments_string = t("Appointments");

  //theme
  const { colorScheme } = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.white_text : styles.grey_text;

  //---------------------------------
  //START OF USER CHARTS ALL USERS DATA
  //Chart1
  const [pieChartData1, setPieChartData1] = useState([]);
  const [usersCount, setUsersCount] = useState([0, 0, 0]); //expertsTotal, noviceTotal, highestPerc

  //Chart2
  const [barChartData2, setBarChartData2] = useState([]);
  const [newUserCount, setNewUsersCount] = useState([0, 0]); //newExpertsTotal, newNovicesTotal

  const addPieChartData1 = async () => {
    const [data, experts_total, novices_total, barData, new_experts_total, new_novices_total] = CalculateUserStatsHelper(allUsersData.users);
    //Chart1 Data fill
    setPieChartData1(data);
    let [max, min, highest_percantage] = [0, 0, 0];
    [max, min] = experts_total > novices_total ? [experts_total, novices_total] : [novices_total, experts_total];
    highest_percantage = (max / (max + min)) * 100;
    4;
    setUsersCount([experts_total, novices_total, highest_percantage]);

    //Chart2 Data Fill
    setBarChartData2(barData);
    setNewUsersCount([new_experts_total, new_novices_total]);
  };
  //END OF USER CHARTS ALL USERS DATA
  //---------------------------------

  //---------------------------------------
  //START OF GET CHATS AND APPOINTMENTS STATS
  const [lineChartData4, setLineChartData4] = useState<any>([]);
  const addLineChartData4 = async () => {
    const chats_count_last_sixmonths = await getChatsStatsFromFirestore();
    const [x_axis_labels, appointments_result, appointments_total, chats_result, chats_total] = CalculateChatsAndAppointmentsStatsHelper(
      chats_count_last_sixmonths,
      allUsersData.countAppointments
    );
    setLineChartData4([x_axis_labels, appointments_result, chats_result, appointments_total, chats_total]);
  };
  //END OF GET CHATS AND APPOINTMENTS STATS
  //---------------------------------------

  //---------------------------
  //START OF MAIN LOADING ALL DATA
  const { data: allUsersData, isLoading: isLoadingGetAllData } = useGetAllUsersWithStatistics();

  useEffect(() => {
    if (allUsersData) {
      addPieChartData1();
      addLineChartData4();
    }
  }, [allUsersData]);
  //END OF MAIN LOADING ALL DATA
  //---------------------------

  //---------------------------
  //------------------
  //LOADING DATA STATE
  if (isLoadingGetAllData || !pieChartData1 || !barChartData2 || !lineChartData4) {
    return <ActivityIndicatorComponent title="Users and Statistics are getting loaded" color={COLORS.dark} />;
  }

  //--------------
  //MAIN COMPONENT
  return (
    <View style={bgcolor_style} className="items-center justify-evenly flex-1 gap-1">
      <ScrollView horizontal={true} className="flex-row">
        {/* START OF ALL USERS CHARTS */}
        <View style={styles.screenWidth} className=" flex-1 items-center justify-center">
          <View className="rounded-2xl m-7 p-4 bg-[#232B5D]">
            <Text style={textcolor_style} className=" text-base font-bold">
              All Users Count
            </Text>
            <View className="items-center p-5">
              <PieChart
                data={pieChartData1}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={"#232B5D"}
                centerLabelComponent={() => (
                  <View className="justify-center items-center">
                    <Text style={textcolor_style} className="text-xl font-bold">
                      {usersCount[2].toFixed(2)}%
                    </Text>
                    <Text style={textcolor_style} className="text-base capitalize">
                      {usersCount[0] >= usersCount[1] ? experts_string : novices_string}
                    </Text>
                  </View>
                )}
              />
            </View>
            <ChartsLowerLegendComponent novices_total={usersCount[1]} experts_total={usersCount[0]} users_total={usersCount[0] + usersCount[1]} />
            <View className="absolute right-0 h-full justify-center mr-1">
              <AntDesign name="rightcircle" size={24} color={COLORS.white} />
            </View>
          </View>
        </View>
        {/* END OF ALL USERS CHARTS */}

        {/* START OF NEW USERS CHART */}
        <View style={styles.screenWidth} className=" bg-[#232B5D] items-center justify-center">
          <View>
            <ChartsUpperLegendComponent
              chart_type="new Users"
              dot2_title={`${newUserCount[0]} ${experts_string}`}
              dot1_title={`${newUserCount[1]} ${novice_string}`}
            />
            <BarChart
              data={barChartData2}
              barWidth={8}
              spacing={24}
              roundedTop
              roundedBottom
              hideRules
              xAxisThickness={2}
              yAxisThickness={2}
              yAxisTextStyle={textcolor_style}
              xAxisLabelTextStyle={textcolor_style}
              noOfSections={3}
              maxValue={150}
            />
            <View className="h-1/4 justify-center">
              <Text style={textcolor_style} className="text-md font-semibold text-center capitalize">
                {newUserCount[0] + newUserCount[1]} {newusers_string}
              </Text>
            </View>
            <View className="absolute right-0 h-full justify-center ml-5">
              <AntDesign name="rightcircle" size={24} color={COLORS.white} />
            </View>
          </View>
        </View>
        {/* END OF NEW USERS CHART */}

        {/* START OF APPOINTMENTS AND NEW STATISTICS CHART */}
        <View style={styles.screenWidth} className="w-1/4 items-center justify-center">
          <View className="rounded-2xl p-4 bg-[#232B5D]">
            <ChartsUpperLegendComponent
              chart_type="AppointmentsAndChats"
              dot1_title={`${lineChartData4[4]} ${chats_string}`}
              dot2_title={`${lineChartData4[3]} ${appointments_string}`}
            />
            <LineChart
              data={lineChartData4[1]}
              data2={lineChartData4[2]}
              height={250}
              width={250}
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
              yAxisTextStyle={textcolor_style}
              xAxisLabelTextStyle={textcolor_style}
              xAxisLabelTexts={lineChartData4[0]}
              dataPointsHeight={6}
              dataPointsWidth={6}
              dataPointsColor1="blue"
              dataPointsColor2="red"
              textShiftY={0}
              textShiftX={0}
              textFontSize={10}
            />
          </View>
        </View>
        {/* END OF APPOINTMENTS AND NEW STATISTICS CHART */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
