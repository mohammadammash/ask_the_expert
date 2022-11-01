import { View, ScrollView } from "react-native";
import { AllUsersStatisticsChartComponent, FieldsStatisticsChartComponent, NewUsersStatisticsChartComponent, AppointmentsAndNewChatsStatisticsChartComponent } from "../../components";

const HomeScreen = () => {
  return (
    <View className="items-center justify-evenly flex-1 gap-1 bg-white">
      <View>
        <ScrollView horizontal={true} className="flex-row">
          <AllUsersStatisticsChartComponent />

          <NewUsersStatisticsChartComponent />

          <FieldsStatisticsChartComponent />

          <AppointmentsAndNewChatsStatisticsChartComponent />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
