import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
//internal imports
import Admin_Apis from "../networks/admin";
import { userType } from "./UserContext";

export const ALL_USERS_KEY = ["ALL_USERS_KEY"];

export const useGetAllUsersWithStatistics = () => useQuery({
    queryKey: ALL_USERS_KEY,
    refetchInterval: 1800000, //auto refetch every 30min
    refetchOnWindowFocus: true,
    queryFn: () => Admin_Apis.all_users_with_statistics_get(),
    onSuccess: (data) => {
        queryClient.setQueryData(ALL_USERS_KEY, { ...data.data })
    }
})

export const useBanOrUnBanUser = () => useMutation({
    mutationFn: (data: any) => Admin_Apis.ban_or_unban_user_post(data),
    onSuccess: (data) => {
        queryClient.invalidateQueries(ALL_USERS_KEY); //update users data
    },
});
