import { View, Text, ScrollView } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View className="bg-white items-center justify-evenly flex-1">
      <View className="h-2/5">
        <ScrollView horizontal={true} className="gap-2">
          <View className="rounded-lg border-2 items-center w-80 bg-slate-100 bg-opacity-70">
          </View>
        </ScrollView>
      </View>

      <View className="h-2/5">
        <ScrollView horizontal={true} className="gap-2">
          <View className="rounded-lg border-2 items-center w-80 bg-slate-100 bg-opacity-70">
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
