import {Card, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {LobbyTable} from "../components/tables/LobbyTable.tsx";
import {useLobbyList} from "../hooks/api/lobby/useLobbyList.tsx";
import {useGamesList} from "../hooks/api/games/useGamesList.tsx";
import {useSelectionStore} from "../stores/selectionStore.ts";

export function LobbyPage() {
    const {lobbies} = useLobbyList();
    const {games} = useGamesList();
    const selectedGameId = useSelectionStore((state) => state.selectedGameId);
    const setSelectedGameId = useSelectionStore((state) => state.setSelectedGameId);
    const filteredGames = selectedGameId ? games.filter(g => g.id === selectedGameId) : games;

    return (
        <>
            <Typography variant={"h2"}>
                Lobbies
            </Typography>
            <Stack direction="row"
                   sx={{height: "90%"}}
                   gap={2}>
                <Card
                    sx={{
                        flex: 1,
                        height: "100%",
                        p: 2
                    }}
                >
                    <Typography variant={"h4"}
                                color={"primary"}>Opties</Typography>
                    <InputLabel id="game-label"
                                sx={{mt: 2, mb: 1}}>Game</InputLabel>
                    <Select
                        labelId="game-label"
                        value={selectedGameId ?? "all"}
                        onChange={(e) =>
                            setSelectedGameId(e.target.value === "all" ? null : e.target.value)
                        }
                    >
                        <MenuItem value="all">Alles</MenuItem>
                        {games.map(game => (
                            <MenuItem key={"game" + game.id} value={game.id}>
                                {game.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Card>
                <LobbyTable
                    lobbies={lobbies}
                    games={filteredGames}
                />
            </Stack>
        </>
    )
}