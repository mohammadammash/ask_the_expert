import { useMutation, useQuery } from "@tanstack/react-query";
//internal imports 
import { queryClient } from "../../App";
import Novice_Apis from "../networks/novice";

export const CLOSE_EXPERTS_KEYS = ["CLOSE_EXPERTS_KEYS"];
export const BOOKED_APPOINTMENT_KEY = (id: string) => [`BOOKED_APPOINTMENT_KEY_${id}`];
export const CURRENT_USER_REVIEW_KEY = (expert_id: string) => [`CURRENT_USER_REVIEW_KEY_${expert_id}`]

export const useCloseExperts = ({ enabled, params }: { enabled: boolean, params: any }) => {
    return useQuery({
        refetchOnWindowFocus: false,
        enabled,
        queryKey: ["CLOSE_EXPERTS_KEYS"],
        queryFn: () => Novice_Apis.closeExperts_get(params),
        onSuccess: (data) => {
            queryClient.setQueryData([CLOSE_EXPERTS_KEYS], { ...data.data })
        }
    })
};

export const useBookAppointment = () => useMutation({
    mutationFn: (data: any) => Novice_Apis.bookAppointment_post(data),
    onSuccess: (data: any) => {
        queryClient.setQueryData(BOOKED_APPOINTMENT_KEY(data.data._id), { ...data.data })
    }
});

export const useAddReview = () => useMutation({
    mutationFn: (data: any) => Novice_Apis.addReview_post(data),
    onSuccess: (data: any) => {
        queryClient.setQueryData(BOOKED_APPOINTMENT_KEY(data.data._id), { ...data.data })
    }
});

export const useDeleteReview = () => useMutation({
    mutationFn: (data: any) => Novice_Apis.removeReview_delete(data),
});;