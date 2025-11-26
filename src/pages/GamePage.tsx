import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {GamePlayer} from "../components/GamePlayer.tsx";

export function GamePage() {
    const {gameId} = useParams();

    //Fetch full game-data for this game here from backend.
    return (
        <>
            <Typography variant={"h2"}>
                GAMENAME
            </Typography>
            <GamePlayer/>
        </>
    )
}