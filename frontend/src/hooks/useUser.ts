import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
//internal imports
import User_Apis from "../networks/user";

export const CURRENT_USER_KEY = ["CURRENT_USER_KEY"];

export const useCurrentUser = ({ enabled }) =>
    useQuery({
        refetchOnWindowFocus: false,
        enabled,
        queryKey: CURRENT_USER_KEY,
        queryFn: () => User_Apis.user_get(),
        onSuccess: (data) => {
            queryClient.setQueryData(CURRENT_USER_KEY, { ...data.data })
            alert(JSON.stringify(data));
        }
    });
