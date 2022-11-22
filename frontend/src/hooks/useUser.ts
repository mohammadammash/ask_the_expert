import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "../../App";
//internal imports
import User_Apis from "../networks/user";
import { logoutUser } from "../utils/authentication";
import { userInitialData, useUserContext } from "./UserContext";

export const CURRENT_USER_KEY = ["CURRENT_USER_KEY"];
export const LEADERBOARD_EXPERTS_KEY = ["RANKED_EXPERTS_KEY"];

export const useCurrentUser = ({ enabled }) =>
    useQuery({
        refetchOnWindowFocus: false,
        enabled,
        queryKey: CURRENT_USER_KEY,
        queryFn: () => User_Apis.user_get(),
        onError: async (error: AxiosError) => {
            const { setUser } = useUserContext();
            if (error.request.status === 403 || error.request.status === 401) {
                await logoutUser(true);
                setUser({ ...userInitialData });
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(CURRENT_USER_KEY, { ...data.data })
        },

    })

    //leaderboard ranked experts
    export const useLeaderboardExperts = () =>
        useQuery({
            refetchOnWindowFocus: false,
            queryKey: LEADERBOARD_EXPERTS_KEY,
            queryFn: () => User_Apis.leaderboard_get(),
            placeholderData: [],
            onError: async (error: AxiosError) => {
                const { setUser } = useUserContext();
                if (error.request.status === 403 || error.request.status === 401) {
                    await logoutUser(true);
                    setUser({ ...userInitialData });
                }
            },
            onSuccess: (data: any) => {
                queryClient.setQueryData(LEADERBOARD_EXPERTS_KEY, { ...data.data })
            }
        });

    //Delete-Remove Appointments
    export const useDeleteAppointment = () => useMutation({
        mutationFn: (data: any) => User_Apis.appointment_delete(data),
        onError: async (error: AxiosError) => {
            const { setUser } = useUserContext();
            if (error.request.status === 403 || error.request.status === 401) {
                await logoutUser(true);
                setUser({ ...userInitialData });
            }
        },
    });

    //Update Profile
    export const useUpdateUser = () => useMutation({
        mutationFn: (data: any) => User_Apis.user_update(data),
        onError: async (error: AxiosError) => {
            const { setUser } = useUserContext();
            if (error.request.status === 403 || error.request.status === 401) {
                await logoutUser(true);
                setUser({ ...userInitialData });
            }
        },
        onSuccess: (data: any) => {
            queryClient.setQueryData(CURRENT_USER_KEY, { ...data.data })
        }
    });
