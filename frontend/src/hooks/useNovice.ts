import { useMutation, useQuery } from "@tanstack/react-query";
//internal imports 
import { queryClient } from "../../App";
import Novice_Apis from "../networks/novice";

export const CLOSE_EXPERTS_KEYS = ["CLOSE_EXPERTS_KEYS"];


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
