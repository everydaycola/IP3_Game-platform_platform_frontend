import {CircularProgress, Typography, Container, Stack} from "@mui/material";
import {GameCardList} from "../components/GameCard.tsx";
import {useGamesList} from "../hooks/useGamesList.tsx";
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';

export function GamesPage() {
    const {isLoading: isLoadingGamesList, isError: isErrorGamesList, games} = useGamesList()

    if (isLoadingGamesList){
        return <CircularProgress/>
    }

    if (isErrorGamesList || !games){
        return <div>Something went Wrong! <SentimentDissatisfied/></div>
    }

    return (
        <>
            <Typography variant={"h2"}>
                Games
            </Typography>
            {games.length != 0?
                <GameCardList games={games}/>
                :
                <Container>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <VideogameAssetOffIcon/>
                        <Typography color={"info"}>Geen games gevonden</Typography>
                    </Stack>
                </Container>
            }
        </>
    )
}