import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
//internal imports
import Auth_Apis from "../networks/auth";

export const CURRENT_USER_KEY = ["CURRENT_USER_KEY"];

export const useLoginUser = () => useMutation({
    mutationFn: (data: any) => Auth_Apis.login_post(data),
    onSuccess: (data: any) => queryClient.setQueryData(CURRENT_USER_KEY, { ...data }),
});

export const useRegisterUser = () => useMutation({
    mutationFn: (data: any) => Auth_Apis.register_post(data),
    onSuccess: (data: any) => queryClient.setQueryData(CURRENT_USER_KEY, { ...data }),
});

