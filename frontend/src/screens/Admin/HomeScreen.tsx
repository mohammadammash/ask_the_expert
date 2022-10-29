import { View, Text, ScrollView } from "react-native";
import AllUsersCountChart from "../../components/Admin/Charts/AllUsersStatistics";

const HomeScreen = () => {
  return (
    <View className="bg-white items-center justify-evenly flex-1 gap-1">
      <View className="h-5/6">
        <ScrollView horizontal={true} className="gap-2">
            <AllUsersCountChart/>
        </ScrollView>
      </View>

    </View>
  );
};

export default HomeScreen;
