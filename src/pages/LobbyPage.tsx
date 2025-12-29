import {Card, Stack,Typography} from "@mui/material";
import {LobbyTable} from "../components/tables/LobbyTable.tsx";
import {useLobbyList} from "../hooks/api/lobby/useLobbyList.tsx";

export function LobbyPage() {
    const {lobbies} = useLobbyList();
    return (
        <>
            <Typography variant={"h2"}>
                Lobbies
            </Typography>
            <Stack direction="row" sx={{ height: "90%" }} gap={2}>
                <Card
                    sx={{
                        flex: 1,
                        height: "100%",
                    }}
                ></Card>
                    <LobbyTable lobbies={lobbies}/>
            </Stack>
        </>
    )
}