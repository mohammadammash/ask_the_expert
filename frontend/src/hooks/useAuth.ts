import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "../../App";
//internal imports
import Auth_Apis from "../networks/auth";

export const AUTH_USER_KEY = ["AUTH_USER_KEY"];

export const useLoginUser = () => useMutation({
    mutationFn: (data: any) => Auth_Apis.login_post(data),
    onSuccess: (data: any) => queryClient.setQueryData(AUTH_USER_KEY, { ...data.data }),
});

export const useRegisterUser = () => useMutation({
    mutationFn: (data: any) => Auth_Apis.register_post(data),
    onSuccess: (data: any) => queryClient.setQueryData(AUTH_USER_KEY, { ...data.data }),
});;