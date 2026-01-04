import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {PlatformUserUpdateType} from "../../../models/platformuser/platformUser.ts";
import {userDataQueryKey} from "../../../config/api/queryKeys";
import {updateUserProfile} from "../../../services/userService.ts";

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (userUpdateData: PlatformUserUpdateType) => updateUserProfile(userUpdateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: userDataQueryKey.current
            });
        }
    })

    return {
        updateUserProfileData: mutate,
        isPending,
        isError,
        isSuccess,
    };
}
