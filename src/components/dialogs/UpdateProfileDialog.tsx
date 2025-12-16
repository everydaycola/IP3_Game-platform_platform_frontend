import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type UpdateProfileFormValues, updateProfileSchema} from "../../schemas/updateProfileSchema.ts";
import type { PlatformUserUpdateType} from "../../models/platformuser/platformUser.ts";
import {PlatformUserUpdateFormFields} from "../formfields/PlatformUserUpdateFormFields.tsx";
import {usePlatformUser} from "../../hooks/usePlatformUser.tsx";

interface UpdateRoomDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onUpdateUserProfile: (data: PlatformUserUpdateType) => void;
}


export function UpdateRoomDialog({ isOpen, onClose, onUpdateUserProfile}: UpdateRoomDialogProps) {
    const {platformUser} = usePlatformUser();
    console.log(platformUser)
    const theme = useTheme();
    const methods = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            biography:platformUser.biography,
            profilePictureUrl:platformUser.profilePictureUrl,
            bannerUrl: platformUser.bannerUrl
        }
    })

    const {handleSubmit, reset, formState: {isSubmitting}} = methods;

    function handleRoomUpdate(data: UpdateProfileFormValues) {
        const updatedUser: PlatformUserUpdateType = {
            biography:data.biography ? data.biography : "",
            profilePictureUrl:data.profilePictureUrl ? data.profilePictureUrl : "",
            bannerUrl:data.bannerUrl ? data.bannerUrl : "",
        }
        onUpdateUserProfile(updatedUser);
        onClose();
        reset();
    }


    return (
        <Dialog open={isOpen}
                onClose={onClose}
                maxWidth={"lg"}
        >
            <DialogTitle sx={{color:theme.palette.primary.main}}>Profiel bijwerken</DialogTitle>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleRoomUpdate)}
                      noValidate>
                    <DialogContent>
                        <PlatformUserUpdateFormFields/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                variant={"contained"}
                                color={"primary"}
                                disabled={isSubmitting}>
                            Profiel bijwerken
                        </Button>
                        <Button onClick={onClose}
                                color="secondary"
                                disabled={isSubmitting}>Annuleren</Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    )
}
