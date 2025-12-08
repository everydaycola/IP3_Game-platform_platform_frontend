import {Avatar, Button, Card, CardContent, Stack, Typography, useTheme} from "@mui/material";
import {useFriendRequestResponse} from "../../hooks/api/friends/useFriendRequestResponse.tsx";

interface FriendCardProps {
    userName: string;
}

export default function FriendRequestCard({userName}: FriendCardProps) {
    const theme = useTheme();
    const {acceptRequest, denyRequest} = useFriendRequestResponse();
    return (
        <Card
            sx={{
                mt:4,
                borderRadius: 2,
                boxShadow: 1,
                width:350,
                color: theme.palette.primary.main,
            }}
        >
            <CardContent>
                <Stack direction="row" alignItems="center" width="100%">
                    <Stack flex={0.25} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }} />
                    </Stack>
                    <Stack flex={0.75}>
                        <Typography variant="body1" sx={{ml:1}} fontWeight={500}>
                            {userName}
                        </Typography>
                    </Stack>
                    <Button
                        sx={{
                            mr:2,
                            ml:2
                        }}
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => acceptRequest(userName)}
                    >
                        Accepteren
                    </Button>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => denyRequest(userName)}
                    >
                        Weigeren
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}