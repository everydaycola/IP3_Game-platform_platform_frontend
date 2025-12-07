import {Card, CardContent, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useFriendList} from "../hooks/useFriendList.tsx";

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
            color:theme.palette.primary.main
        }}>
            <CardContent>
                <Typography variant={"h4"}><span style={{fontWeight:"bold"}}>{loggedInUser?.username}'s</span> vrienden</Typography>

                {friendList.friends.length === 0 &&
                    <Typography>Zo te zien heb je nog geen vrienden in je vriendenlijst :'(</Typography>
                }

                {friendList.friends.map((friend) => {
                    let correctFriend;
                    if(friend.user1 === friendList.id){
                        correctFriend = friend.user2
                    }else{
                        correctFriend = friend.user1
                    }

                    return <Typography sx={{mt:2}} key={correctFriend}>{correctFriend}</Typography>;
                })}

            </CardContent>
        </Card>

    )
}