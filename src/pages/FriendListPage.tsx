import {Card, CardContent, Stack, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useFriendList} from "../hooks/useFriendList.tsx";
import FriendCard from "../components/cards/FriendCard.tsx";

export function FriendListPage() {
    const theme = useTheme();
    const {loggedInUser} = useContext(SecurityContext);
    const {friendList} = useFriendList();
    console.log(friendList);

    return (
        <Card sx={{
            maxWidth: "100%",
            mx: 'auto',
            mt: 5,
            borderRadius: 3,
            overflow: 'hidden',
            color: theme.palette.primary.main
        }}>
            <CardContent>
                <Typography variant={"h4"}><span style={{fontWeight: "bold"}}>{loggedInUser?.username}'s</span> vrienden</Typography>

                {friendList.friends.length === 0 &&
                    <Typography>Zo te zien heb je nog geen vrienden in je vriendenlijst :'(</Typography>
                }

                <Stack flexWrap={"wrap"} direction={"row"} gap={2}>
                    {friendList.friends.map((friend) => {
                        return <FriendCard key={friend.userName} userName={friend.userName}/>
                    })}
                </Stack>

            </CardContent>
        </Card>

    )
}