import {Button, Card, Stack, Typography, useTheme} from "@mui/material";
import {useLobby} from "../hooks/api/lobby/useLobby.tsx";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {LobbyMemberList} from "../components/lists/LobbyMemberList.tsx";
import {useLobbyStartGame} from "../hooks/api/lobby/useLobbyStartGame.tsx";
import {ConfirmationDialog} from "../components/dialogs/ConfirmationDialog.tsx";
import {useState} from "react";
import axios from "axios";
import {useNotificationStore} from "../stores/notificationStore.ts";

export function LobbyManagementPage() {
    const {lobbyId} = useParams();
    const {lobby} = useLobby(lobbyId!);
    const theme = useTheme();
    const {startGame, startGameError, error} = useLobbyStartGame();
    const addNotification = useNotificationStore((state) => state.addNotification);
    const navigate = useNavigate();
    const [closedStartMessage, setClosedStartMessage] = useState(false);

    function navigateToGame() {
        navigate(`/games/${lobby.gameId}`)
    }

    if(startGameError){
        if (error && axios.isAxiosError(error)) {
            if(error.response?.status === 403 && error.response?.data?.includes("Non lobby manager")){
                addNotification({
                    message:"Je hebt geen rechten om een spel te starten voor deze lobby...",
                    severity:"error"
                })
            }
            if(error.response?.status === 409 && error.response?.data?.includes("Lobby is not full yet")){
                addNotification({
                    message:"Deze lobby mist nog spelers...",
                    severity:"warning"
                })
            }
        }
    }

    return (
        <>
            <Card sx={{maxWidth: "100%", p: 2, mx: 'auto', mt: 5, borderRadius: 3, overflow: 'hidden'}}>
                <Typography variant={"h2"}
                            sx={{color: theme.palette.primary.main}}>
                    Lobby beheer
                </Typography>
                <Stack direction={"row"}
                       gap={4}>
                    <Typography sx={{color: theme.palette.primary.main}}>
                        Lobbyid: {lobby.id}
                    </Typography>
                    <Typography sx={{color: theme.palette.primary.main}}>
                        De lobby werd geopend op {dayjs(lobby.creationDate).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                </Stack>

                <Typography sx={{color: theme.palette.primary.main}}
                            fontWeight={"bold"}>
                    {lobby.players.length}/{lobby.maxPlayers} spelers in de lobby
                </Typography>
                <LobbyMemberList lobby={lobby}/>
                {lobby.currentGameSessionId === null ?
                    <Button
                        color={"secondary"}
                        sx={{mt: 2}}
                        variant={"contained"}
                        onClick={() => {
                            startGame(lobby);
                        }}
                    >
                        Spel starten
                    </Button>
                    :
                    <>
                        <Typography sx={{color: theme.palette.primary.main, mt: 2}}
                                    fontWeight={"bold"}
                                    variant={"h4"}>
                            Het spel is reeds gestart!
                        </Typography>
                        <Button
                            color={"primary"}
                            sx={{mt: 1}}
                            variant={"contained"}
                            onClick={() => {
                                navigateToGame();
                            }}
                        >
                            Naar het spel
                        </Button>
                    </>
                }
            </Card>
            <ConfirmationDialog
                acceptButtonContent={"Spelen"}
                rejectButtonContent={"Nog even de lobby bekijken"}
                isOpen={lobby.currentGameSessionId != null && !closedStartMessage}
                confirmationMessage={"De lobby host heeft het spel gestart, klaar om te spelen?"}
                onAccept={() => {navigateToGame()}}
                onClose={() => {
                    setClosedStartMessage(true)
                }}
            />
        </>
    )
}