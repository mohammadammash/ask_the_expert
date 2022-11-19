import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
//internal imports
import { ROUTES, IMAGES, COLORS } from "../../constants";
import { LoginFormComponent } from "../../components";
import styles from "../../../styles";
import { auth } from "../../../firebaseConfig";
import { useUserContext } from "../../hooks/UserContext";
import { useLoginUser } from "../../hooks/useAuth";
import { getAuthToken, setDefaultTokens } from "../../networks";
import { useCurrentUser } from "../../hooks/useUser";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { setUser } = useUserContext();

  //get auth token if exists, to redirect user instantly
  const [token, setToken] = useState("");
  const getTokenIfExists = async () => {
    const token = await getAuthToken();
    setToken(token);
  };

  useEffect(() => {
    getTokenIfExists();
  }, []);

  //on page loads if there is a token get the user and redirect him/her
  const [enabled, setEnabled] = useState(false);
  const { data: getCurrentUserData, isLoading: isCurrentUserLoading } = useCurrentUser({ enabled });
  useEffect(() => {
    if (token && !mutateLoginUserData) {
      setDefaultTokens(token);
      setEnabled(true); //fetch current user if token exists
    }
  }, [token]);

  //React Query Post:
  const { mutate: mutateLoginUser, isLoading: mutateLoginUserIsLoading, data: mutateLoginUserData } = useLoginUser();
  //when user data is found update UserContext
  useEffect(() => {
    if (mutateLoginUserData && !mutateLoginUserIsLoading) {
      const { token, ...data } = mutateLoginUserData.data;
      setDefaultTokens(token);
      setUser(data);
    }

    //app is closed but token already exists
    if (token && getCurrentUserData && !isCurrentUserLoading) setUser(getCurrentUserData);
  }, [mutateLoginUserData, getCurrentUserData]);

  //FORM DATA
  const [inValidCredentials, setInValidCredentials] = useState(false);
  const handleInvalidCredentials = (value: boolean) => setInValidCredentials(value);

  //FIREBASE AUTH
  const firbaseConfirmLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        let data = { _id: user.uid, email, password };
        mutateLoginUser(data);
      })
      .catch((error) => {
        handleInvalidCredentials(true);
      });
  };

  //PARAMS
  const data = {
    inValidCredentials,
    handleInvalidCredentials,
    firbaseConfirmLogin,
  };

  //MAIN COMPONENT
  //If Login isLoading //show loading indicator in middle of screen until user is redirected
  if (mutateLoginUserIsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      <LoginFormComponent {...data} />

      <View className="flex-row mt-10">
        <Text className="inline mr-1 font-bold">Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text className="font-bold" style={styles.orange_text}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
