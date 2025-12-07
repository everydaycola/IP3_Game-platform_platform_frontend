import {Typography, useMediaQuery} from "@mui/material";
import {useParams} from "react-router-dom";
import {GamePlayer} from "../components/GamePlayer.tsx";
import {useGame} from "../hooks/useGame.tsx";
import {RotateDeviceInstruction} from "../components/RotateDeviceInstruction.tsx";
import {ErrorCard} from "../components/cards/ErrorCard.tsx";


export function GamePage() {
    const {gameId} = useParams();
    const {game} = useGame(gameId!);
    const isPortrait = useMediaQuery('(orientation: portrait)');

    if (!game || !gameId) {
        throw new Error("Something went wrong with fetching a game...")
    }

    return (
        <>
            <Typography variant={"h2"}>
                {game.name}
            </Typography>
            {isPortrait ?
                <RotateDeviceInstruction/>
                :
                <>
                    {game.url ?
                    <GamePlayer gameUrl={game.url}/>
                        :
                        <ErrorCard
                            title={"Ohnee..."}
                            description={"Er ging iets mis met het ophalen van het spel, probeer later opnieuw."}
                        />
                    }
                </>
            }
        </>
    )
}