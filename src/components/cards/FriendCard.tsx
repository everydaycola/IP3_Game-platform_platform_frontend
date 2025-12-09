import {Avatar, Button, Card, CardContent, CircularProgress, IconButton, Stack, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDeleteFriend} from "../../hooks/api/friends/useDeleteFriend.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";

interface FriendCardProps {
    userName: string;
}

export default function FriendCard({userName}: FriendCardProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [isConfirming, setIsConfirming] = useState(false);
    const {removeFriend, removeFriendIsError, removeFriendIsPending} = useDeleteFriend();
    return (
        <Card
            sx={{
                mt: 4,
                borderRadius: 2,
                boxShadow: 1,
                width: 500,
                color: theme.palette.primary.main,
            }}
        >
            <CardContent>
                <Stack direction="row"
                       alignItems="center"
                       width="100%">
                    <Stack flex={0.25}
                           alignItems="center">
                        <Avatar sx={{bgcolor: "primary.main", width: 32, height: 32}}/>
                    </Stack>
                    <Stack flex={0.75}>
                        <Typography variant="body1"
                                    sx={{ml: 1}}
                                    fontWeight={500}>
                            {userName}
                        </Typography>
                    </Stack>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => navigate("http://localhost:5173/profile/" + userName)}
                    >
                        Profiel bezoeken
                    </Button>

                    { !removeFriendIsError && !removeFriendIsPending ?
                        <IconButton
                            sx={{ml: 2, background: theme.palette.secondary.main}}
                            onClick={() => setIsConfirming(true)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        :
                        <Stack direction="column"
                               justifyContent={"center"}
                               alignItems={"center"}
                               spacing={2}
                               sx={{m: 2}}>
                            <CircularProgress/>
                        </Stack>
                    }
                </Stack>
            </CardContent>
            <ConfirmationDialog
                confirmationMessage={"Weet je het zeker?"}
                warningMessage={`Deze actie zal ${userName} uit jouw vriendenlijst verwijderen.`}
                isOpen={isConfirming}
                onAccept={() => removeFriend(userName)}
                onClose={() => setIsConfirming(false)}/>
        </Card>
    );
}