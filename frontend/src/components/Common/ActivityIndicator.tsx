import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
//internal imports
import { ActivityIndicatorProps } from "./types";

const LoadingActivityIndicator: React.FC<ActivityIndicatorProps> = ({ color, title, bgcolor_style, textcolor_style }) => {
  return (
    <View style={bgcolor_style} className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={color} />
      <Text style={textcolor_style} className="text-xs w-3/4 text-center mt-5">
        {title}
      </Text>
    </View>
  );
};

export default LoadingActivityIndicator;
