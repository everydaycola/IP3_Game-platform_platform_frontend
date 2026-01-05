import {useSuspenseQuery} from "@tanstack/react-query";
import {gamesQueryKey} from "../../../config/api/queryKeys";
import {getConversation} from "../../../services/conversationService.ts";

export function useConversation(conversationId: string){
    const {isLoading, isError, data: game} = useSuspenseQuery({
        //queryKey: gamesQueryKey.currentGame(conversationId),
        queryFn: () => getConversation(conversationId),
    })
    return {isLoading, isError, game}
}