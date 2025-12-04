import type {CompactGame} from "../../models/Game.ts";
import {Card, CardContent, CardActionArea, CardMedia, Typography, Stack, useTheme} from "@mui/material"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFavoriteGame} from "../../hooks/useFavoriteGame.tsx";
import {FavoriteButton} from "../FavoriteButton.tsx";

interface GameCardProps {
    game: CompactGame
}

export function GameCard({game}: GameCardProps) {
    const [favorited, setFavorited] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const {addFavorite, removeFavorite} = useFavoriteGame();

    function handleFavoriteChange(){
        console.log("favo is currently: ", favorited);
        if(favorited){
            removeFavorite(game.id);
            setFavorited(false);
        }else{
            addFavorite(game.id);
            setFavorited(true);
        }
    }


    return (
        <Card
            onClick={() => navigate(`/games/${game.id}`)}
            sx={{
                width: {lg: "20%", xs: "40%"},
                height:"60%",
                marginRight: "5%",
                marginBottom: "5%",
                cursor:"pointer",
                borderRadius: 4
        }}>
            <CardActionArea sx={{height: "75%", overflow:"hidden"}}>
                {game.icon == "" ?
                    <Stack alignItems={"center"} sx={{marginY: "1rem"}}>
                        <VideogameAssetIcon sx={{color: theme.palette.text.secondary}}/>
                    </Stack>
                    :
                    <CardMedia component="img"
                               sx={{padding: "5%", height:250, width:"100%",marginX:"auto", objectFit:"cover",}}
                               image={game.icon}/>
                }
            </CardActionArea>
            <CardContent sx={{height: "25%", boxShadow:"5"}}>
                <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography color={theme.palette.text.secondary}>{game.name}</Typography>

                    <FavoriteButton
                        onClick={handleFavoriteChange}
                        selected={favorited}
                    />
                </Stack>
            </CardContent>
        </Card>
    )
}

interface GameCardListProps {
    games: CompactGame[]
}

export function GameCardList({games}: GameCardListProps) {
    return (
        <Stack direction={"row"} flexWrap="wrap" height={"75%"} sx={{pt:2}}>
            {games.map(game => <GameCard game={game} key={game.id}/>)}
        </Stack>
    )
}