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

        <View className="justify-center items-center">
          <TouchableOpacity style={navigationStyles.logoutButton} className='items-center flex-row justify-center' onPress={() => alert("LOGOUT")}>
            <SimpleLineIcons name="logout" size={20} color={COLORS.blue} />
            <Text style={{color: COLORS.blue}} className="ml-2 text-sm font-semibold">LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
