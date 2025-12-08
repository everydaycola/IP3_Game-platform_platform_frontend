import {Button, Card, CardContent, Stack, Typography, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useFriendList} from "../hooks/api/friends/useFriendList.tsx";
import FriendCard from "../components/cards/FriendCard.tsx";
import {useFriendRequestList} from "../hooks/api/friends/useFriendRequestList.tsx";
import FriendRequestCard from "../components/cards/FriendRequestCard.tsx";
import {useNotificationStore} from "../stores/notificationStore.ts";
import {NewFriendDialog} from "../components/dialogs/NewFriendDialog.tsx";

export function FriendListPage() {
    const theme = useTheme();
    const {loggedInUser} = useContext(SecurityContext);
    const {friendList} = useFriendList();
    const {friendRequests} = useFriendRequestList();
    const addNotification = useNotificationStore((state) => state.addNotification);
    const [isAddingNewFriends, setIsAddingNewFriends] = useState(false);

    return (
        <>
            <Card sx={{
                maxWidth: "100%",
                mx: 'auto',
                mt: 5,
                borderRadius: 3,
                overflow: 'hidden',
                color: theme.palette.primary.main
            }}>
                <CardContent>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant={"h4"}><span style={{fontWeight: "bold"}}>{loggedInUser?.username}'s</span> vrienden</Typography>
                        <Stack direction={"row"}>
                            <Button variant={"contained"}
                                    color={"secondary"}
                                    sx={{m: 2}}
                                    onClick={() => addNotification({message: "Test notification", severity: "success"})}>
                                TEST NOTIFICATION
                            </Button>
                            <Button variant={"contained"}
                                    color={"primary"}
                                    sx={{m: 2}}
                                    onClick={() => setIsAddingNewFriends(true)}>
                                Nieuwe vrienden toevoegen
                            </Button>
                        </Stack>
                    </Stack>


                    {friendRequests.friends.length != 0 &&
                        <Stack direction={"column"}
                               sx={{mb: 2, mt: 2}}>
                            <Typography variant={"h5"}>Openstaande vriendschaps verzoeken</Typography>
                            <Stack direction={"row"}
                                   sx={{mt: -2}}
                                   flexWrap={"wrap"}>
                                {friendRequests.friends.map((friendRequest) =>
                                    <FriendRequestCard
                                        data-testid={"friend-request-card"}
                                        userName={friendRequest.userName}
                                        key={"friendRequest" + friendRequest.userName}
                                    />
                                )
                                }
                            </Stack>
                        </Stack>


                    }

                    {friendList.friends.length === 0 &&
                        <Typography variant={"h5"}
                                    data-testid={"no-friend-warning"}>Het lijkt er op dat je nog geen vrienden hebt
                            toegevoegd...</Typography>
                    }

                    <Stack direction={"column"}>
                        <Typography variant={"h5"}>Jouw vrienden:</Typography>
                        <Stack flexWrap={"wrap"}
                               direction={"row"}
                               sx={{mt: -2}}
                               gap={2}>
                            {friendList.friends.map((friend) => {
                                return <FriendCard data-testid={"friend-card"}
                                                   key={friend.userName}
                                                   userName={friend.userName}/>
                            })}
                        </Stack>
                    </Stack>

                </CardContent>
            </Card>
            <NewFriendDialog isOpen={isAddingNewFriends} onClose={() => setIsAddingNewFriends(false)}/>
        </>
    )
}