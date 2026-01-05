import {useQuery} from "@tanstack/react-query";
import {getConversation} from "../../../services/conversationService.ts";
import {conversationQueryKey} from "../../../config/api/queryKeys";

export function useConversation(conversationId: string){
    const {data: conversation, isPending, isError} = useQuery({
        queryKey: conversationQueryKey.current,
        queryFn: () => getConversation(conversationId),
        enabled: conversationId != null
    })
    return {conversation, isError, isPending}
}