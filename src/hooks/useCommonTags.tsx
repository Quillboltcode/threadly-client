import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PostService } from "../services/postServices";

export const useCommonTags = () => {
    return useQuery({
        queryKey: ['commonTags'],
        queryFn: async () => {
            const data = await PostService.getCommonTags();
            return data;
        },
        placeholderData : keepPreviousData,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
}
