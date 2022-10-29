import { View, Text } from "react-native";
//internal imports
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import commonStyles from "../../components/Common/common.styles";
import { useRoute } from "@react-navigation/native";
import { ROUTES } from "../../constants";

interface FilterPageTitleProps {
  userType: string;
  options: {
    label: string;
    value: string;
  }[];
  set_userType: React.Dispatch<React.SetStateAction<string>>;
}

const FilterPageTitle: React.FC<FilterPageTitleProps> = ({ userType, options, set_userType }) => {
  const route = useRoute();
  const { name: route_name } = route;

  return (
    <View className="flex-row h-1/6 items-center w-full justify-between px-3">
      <Text className="font-bold">
        View {route_name === ROUTES.ADMIN_VIEW_BANNED_USERS ? "Banned" : "All"} {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </Text>
      <SelectCountry
        style={commonStyles.dropdown}
        selectedTextStyle={commonStyles.selectedTextStyle}
        placeholderStyle={commonStyles.placeholderStyle}
        iconStyle={commonStyles.iconStyle}
        maxHeight={200}
        renderRightIcon={() => <Ionicons name="filter" size={18} color="black" />}
        value={userType}
        data={options}
        valueField="value"
        labelField="label"
        imageField="image"
        placeholder="All"
        searchPlaceholder="Search..."
        onChange={(e) => {
          set_userType(e.value);
        }}
      />
    </View>
  );
};

export default FilterPageTitle;
