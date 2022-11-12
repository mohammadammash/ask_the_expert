import { ImageBackground, Image, View, TouchableOpacity, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
//internal imports
import navigationStyles from "./navigation.styles";
import { IMAGES, COLORS, ROUTES } from "../../constants";

const CustomDrawer = ({ props, handleLogout }: { props: DrawerContentComponentProps; handleLogout: () => void }): JSX.Element => {
  return (
    // Drawer whole content
    <DrawerContentScrollView {...props} contentContainerStyle={navigationStyles.mainContainer}>
      <ImageBackground className="h-36" source={IMAGES.fakeMapImage}>
        <Image source={IMAGES.dummyProfile} style={navigationStyles.userImg} />
      </ImageBackground>

      <View className="h-5/6 justify-between pb-5">
        <View style={navigationStyles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>

        <View className="justify-center items-center">
          <TouchableOpacity style={navigationStyles.logoutButton} className="items-center flex-row justify-center" onPress={handleLogout}>
            <SimpleLineIcons name="logout" size={20} color={COLORS.blue} />
            <Text style={{ color: COLORS.blue }} className="ml-2 text-sm font-semibold">
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
