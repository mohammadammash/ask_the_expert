import * as SecureStore from 'expo-secure-store';
import { t } from 'i18next';
import AlertAsync from "react-native-alert-async";

//Return Auth Token
export const getAuthToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    return token ? token : "";
};

//Set Auth Token
export const setAuthToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('token', token);
    }
    catch (err) {
        console.log(err);
    }
}

//User Logout by removing Authtoken and returning Boolean Success
export const logoutUser = async () => {
    const cancel_string = t("Cancel");
    const submit_string = t("Submit");
    const logout_string = t("Logout");

    const AsyncAlert = async () => {
        const choice = await AlertAsync(
            logout_string,
            "\nAre you sure you want to Logout?",
            [{ text: cancel_string, style: "destructive", onPress: () => false },
            { text: submit_string, style: 'default', onPress: () => true }],
            { cancelable: true },
        );
        if (choice) await SecureStore.deleteItemAsync('token');
        return choice;
    }

    return AsyncAlert();
}
