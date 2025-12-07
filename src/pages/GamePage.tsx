import {Typography, useMediaQuery} from "@mui/material";
import {useParams} from "react-router-dom";
import {GamePlayer} from "../components/GamePlayer.tsx";
import {useGame} from "../hooks/useGame.tsx";
import {RotateDeviceInstruction} from "../components/RotateDeviceInstruction.tsx";
import {ErrorCard} from "../components/cards/ErrorCard.tsx";
import {useGameIsFavorite} from "../hooks/useIsFavoriteGame.tsx";


export function GamePage() {
    const {gameId} = useParams();
    const {game} = useGame(gameId!);
    const {isFavorite} = useGameIsFavorite(gameId!);
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
                    <GamePlayer gameId={game.id} gameUrl={game.url} isFavorite={isFavorite}/>
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