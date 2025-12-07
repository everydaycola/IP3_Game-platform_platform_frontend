import {Card, CardContent, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";

export function FriendListPage() {
    const theme = useTheme();
    const {loggedInUser} = useContext(SecurityContext);

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
                <Typography>Hier de lijst renderen</Typography>
            </CardContent>
        </Card>

    )
}