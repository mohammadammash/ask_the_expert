import { useMutation } from "@tanstack/react-query";
//internal imports 
import { queryClient } from "../../App";
import Expert_Apis from "../networks/expert";

export const CURRENT_USER_APPOINTMENT_GROUP_KEY = ["CURRENT_USER_APPOINTMENT_GROUP_KEY"];

export const useGoOnlineExpert = () => useMutation({
    mutationFn: (data: any) => Expert_Apis.goOnline_post(data),
    onSuccess: (data: any) => {
        queryClient.setQueryData(CURRENT_USER_APPOINTMENT_GROUP_KEY, { ...data })
        alert(JSON.stringify(data, null, 2));
    }
});
