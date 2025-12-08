import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, useTheme} from "@mui/material";
import {AddOnUserName} from "../controls/AddOnUserName.tsx";
import {FriendRecommendationList} from "../lists/FriendRecommendationList.tsx";
import {Suspense} from "react";

interface NewFriendDialog {
    isOpen: boolean;
    onClose: () => void;
}

export function NewFriendDialog({isOpen, onClose}: NewFriendDialog) {
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth={"lg"}
            sx={{color: theme.palette.primary.main}}
        >
            <DialogTitle sx={{color: theme.palette.primary.main}}
                         component={"h4"}>
                Nieuwe vrienden toevoegen
            </DialogTitle>
            <DialogContent>
                <Stack direction="row"
                       spacing={2}>
                    {/* Left side - 75% */}
                    <Box sx={{flex: 3}}>
                        <Suspense fallback={<CircularProgress/>}>
                            <FriendRecommendationList/>
                        </Suspense>
                    </Box>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            my: 2,
                            borderColor: theme.palette.primary.main,
                            width: 2
                        }}
                    />
                    <Box sx={{flex: 1}}>
                        <AddOnUserName/>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}
                        color="secondary"
                >
                    Annuleren
                </Button>
            </DialogActions>
        </Dialog>
    )
}