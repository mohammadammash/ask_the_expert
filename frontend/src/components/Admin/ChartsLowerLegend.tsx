import { View, Text } from "react-native";
import { t } from "i18next";

interface ChartsLowerLegendProps {
  experts_total: number;
  novices_total: number;
  users_total: number;
}

const renderDot = (color: string): JSX.Element => <View className={`rounded-full h-3 w-3 mr-1`} style={{ backgroundColor: color }} />;

//titles for language change

const ChartsLowerLegend: React.FC<ChartsLowerLegendProps> = ({ experts_total, novices_total, users_total }): JSX.Element => {
  const users_string = t("Users");
  return (
    <>
      <View className="flex-row my-5 w-full justify-around">
        <View className="flex-row mr-5 items-center">
          {renderDot("#006DFF")}
          <Text className="text-white">Experts: {experts_total}</Text>
        </View>
        <View className="flex-row ml-10 items-center">
          {renderDot("#BDB2FA")}
          <Text className="text-white">Novices: {novices_total}</Text>
        </View>
      </View>
      <View className="flex-row justify-center">
        <View className="flex-row items-center justify-center w-32 mr-5">
          {renderDot("#3BE9DE")}
          <Text className="text-white">
            {users_string}: {users_total}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ChartsLowerLegend;
