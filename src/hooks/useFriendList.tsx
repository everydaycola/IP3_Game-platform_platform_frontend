import { useSuspenseQuery} from "@tanstack/react-query";
import {friendsQueryKey} from "../config/api/queryKeys";
import {findAllFriends} from "../services/friendService.ts";

export function useFriendList(){
    const { data: friendList} = useSuspenseQuery({
        queryKey: friendsQueryKey.all,
        queryFn: () => findAllFriends(),
    })
    return {friendList}
}