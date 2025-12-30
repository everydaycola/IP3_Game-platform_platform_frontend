import {Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import type {Lobby} from "../../models/lobby/Lobby.ts";
import {useJoinLobby} from "../../hooks/api/lobby/useJoinLobby.tsx";
import axios from "axios";
import {useNotificationStore} from "../../stores/notificationStore.ts";
import type {CompactGame} from "../../models/game/Game.ts";
import {useNavigate} from "react-router-dom";

interface LobbyTableProps{
    lobbies: Lobby[];
    games: CompactGame[];
}

export function LobbyTable({lobbies, games}:LobbyTableProps){
    const {joinLobby, joinLobbyIsError, error} = useJoinLobby();
    const addNotification = useNotificationStore((state) => state.addNotification);
    const navigate = useNavigate();
    const allowedGameIds = new Set(games.map(g => g.id));
    const safeLobbies = lobbies ?? [];
    const filteredLobbies = allowedGameIds.size > 0
        ? safeLobbies.filter(lobby => allowedGameIds.has(lobby.gameId))
        : safeLobbies;

    if (joinLobbyIsError) {
        if (error && axios.isAxiosError(error)) {
            if(error.response?.status === 409 && error.response?.data?.includes("already inside")){
                addNotification({
                    message:"Je bent al lid van deze lobby...",
                    severity:"error"
                })
            }
        }
    }

    return(
        <TableContainer component={Card} sx={{flex:4, height:"100%", overflowY:"scroll"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Lobby ID</TableCell>
                        <TableCell>Game</TableCell>
                        <TableCell align="right">Playercount</TableCell>
                        <TableCell align="right">Join</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredLobbies.map(lobby =>
                        <TableRow
                            key={"lobby"+ lobby.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {lobby.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {games?.find(game => game.id === lobby.gameId)?.name ?? "Unknown Game"}
                            </TableCell>
                            <TableCell align="right">{lobby.players.length}/{lobby.maxPlayers}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant={"contained"}
                                    onClick={async () => {
                                        await joinLobby(lobby.id)
                                        navigate(`/lobby/${lobby.id}`)
                                    }}
                                >
                                    JOIN
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}