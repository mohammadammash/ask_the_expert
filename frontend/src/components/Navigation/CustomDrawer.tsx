import { ImageBackground, Image, View, StatusBar, TouchableOpacity, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons"; 
//internal imports
import { IMAGES, COLORS } from "../../constants";
import navigationStyles from "./navigation.styles";

const CustomDrawer = (props: DrawerContentComponentProps): JSX.Element => {

  return (
    // drawer whole content
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0, backgroundColor: COLORS.dark, height: "100%" }}>
      <ImageBackground className="h-36" source={IMAGES.fakeMapImage}>
        <Image source={IMAGES.dummyProfile} style={navigationStyles.userImg} />
      </ImageBackground>
      <View className="h-5/6 justify-between pb-5">
        <View style={navigationStyles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>
        <TouchableOpacity style={{borderColor: COLORS.grey}} className="flex-row border-t h-14 items-center pl-3 py-3" onPress={() => alert("LOGOUT")}>
          <SimpleLineIcons name="logout" size={24} color={COLORS.blue} />
          <Text className="ml-9 text-sm text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
