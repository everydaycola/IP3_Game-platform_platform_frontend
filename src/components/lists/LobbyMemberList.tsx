import {Typography, useTheme} from "@mui/material";
import {usePlatformUsers} from "../../hooks/api/user/usePlatformUsers.tsx";
import type {Lobby} from "../../models/lobby/Lobby.ts";
import UserCard from "../cards/UserCard.tsx";

interface LobbyMemberListProps{
    lobby: Lobby
}

export function LobbyMemberList({lobby}:LobbyMemberListProps) {
    const theme = useTheme();
    const {userData, isError, isPending } = usePlatformUsers(lobby.players.map(u => u.userId))

    if(isPending){
        return <div>Loading...</div>
    }

    if(isError || !userData){
        return <Typography variant={"h4"}
                           sx={{color: theme.palette.primary.main, mt: 2}}>
            Er ging iets mis met het ophalen van de spelerlijst...
        </Typography>
    }

    return (
        <>
        <Typography variant={"h4"}
                    sx={{color: theme.palette.primary.main, mt: 2}}>
            Spelers in deze lobby
        </Typography>
            {userData.map(u =>
                <UserCard userName={u.userName}/>
            )}
        </>
    )
}