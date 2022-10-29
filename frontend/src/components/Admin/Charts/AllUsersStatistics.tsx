import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";

const AllUsersCountChart = () => {
  const pieData = [
    {
      value: 67,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 33, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
  ];

  const renderDot = (color) => {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>Experts: 121</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", width: 120 }}>
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>Novices: 59</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>Users: 180</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#34448B",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#232B5D",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Performance</Text>
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>67%</Text>
                  <Text style={{ fontSize: 14, color: "white" }}>Experts</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default AllUsersCountChart;
