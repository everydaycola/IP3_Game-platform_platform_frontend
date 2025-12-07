import {Avatar, Button, Card, CardContent, Stack, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface FriendCardProps {
    userName: string;
}

export default function FriendCard({userName}: FriendCardProps) {
    const theme = useTheme();
    const navigate = useNavigate();
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
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => navigate("http://localhost:5173/profile/"+userName)}
                    >
                        Profiel bezoeken
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}