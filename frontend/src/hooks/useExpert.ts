import { useMutation } from "@tanstack/react-query";
//internal imports 
import { queryClient } from "../../App";
import Expert_Apis from "../networks/expert";

export const CURRENT_USER_APPOINTMENT_GROUP_KEY = ["CURRENT_USER_APPOINTMENT_GROUP_KEY"];

export const NOVICES_DEVICES_TOKENS_KEYS = ['NOVICES_DEVICES_TOKENS_KEYS'];

export const useGoOnlineExpert = () => useMutation({
    mutationFn: (data: any) => Expert_Apis.goOnline_post(data),
    onSuccess: (data: any) => {
        queryClient.setQueryData(CURRENT_USER_APPOINTMENT_GROUP_KEY, { ...data.data })
    }
});

export const useGoOfflineExpert = () => useMutation({
    mutationFn: () => Expert_Apis.goOffline_post(),
    onSuccess: (data: any) => {
        queryClient.setQueryData(NOVICES_DEVICES_TOKENS_KEYS, { ...data.data })
    }
});
