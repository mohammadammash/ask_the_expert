import { View, Text, ScrollView } from "react-native";
import {AllUsersStatisticsChartComponent, AppointmentsStatisticsChartComponent} from "../../components";

const HomeScreen = () => {
  return (
    <View className="bg-white items-center justify-evenly flex-1 gap-1">
      <View className="h-5/6">
        <ScrollView horizontal={true} className="flex-row">
          <AllUsersStatisticsChartComponent />
          <AppointmentsStatisticsChartComponent/>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
