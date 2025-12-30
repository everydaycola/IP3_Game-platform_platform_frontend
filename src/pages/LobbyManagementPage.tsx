import {Card, Stack, Typography, useTheme} from "@mui/material";
import {useLobby} from "../hooks/api/lobby/useLobby.tsx";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {LobbyMemberList} from "../components/lists/LobbyMemberList.tsx";

//Todo implement logic to actual start a game from a lobby.
export function LobbyManagementPage() {
    const {lobbyId} = useParams();
    const {lobby} = useLobby(lobbyId!);
    console.log(lobby);
    const theme = useTheme();


    return (
        <>
            <Card sx={{maxWidth: "100%", p: 2, mx: 'auto', mt: 5, borderRadius: 3, overflow: 'hidden'}}>
                <Typography variant={"h2"}
                            sx={{color: theme.palette.primary.main}}>
                    Lobby beheer
                </Typography>
                <Stack direction={"row"} gap={4}>
                    <Typography sx={{color: theme.palette.primary.main}}>
                        Lobbyid: {lobby.id}
                    </Typography>
                    <Typography sx={{color: theme.palette.primary.main}}>
                        De lobby werd geopend op {dayjs(lobby.creationDate).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                </Stack>
                <Typography sx={{color: theme.palette.primary.main}} fontWeight={"bold"}>
                    {lobby.players.length}/{lobby.maxPlayers} spelers in de lobby
                </Typography>
                <LobbyMemberList lobby={lobby}/>
            </Card>
        </>
    )
}