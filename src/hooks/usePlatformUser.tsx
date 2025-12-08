import {useSuspenseQuery} from "@tanstack/react-query";
import {userDataQueryKey} from "../config/api/queryKeys";
import {getPlatformUserData} from "../services/userService.ts";

export function usePlatformUser(){
    const { data: platformUser} = useSuspenseQuery({
        queryKey: userDataQueryKey.current,
        queryFn: () => getPlatformUserData(),
    })
    return {platformUser}
}