import type {CompactGame} from "../models/Game.ts";
import {Card, CardContent, CardActionArea, CardMedia, Typography, Stack, IconButton, useTheme} from "@mui/material"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface GameCardProps {
    game: CompactGame
}

export function GameCard({game}: GameCardProps) {
    const [favorited, setFavorited] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

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
                        <VideogameAssetIcon sx={{color: theme.palette.primary.dark}}/>
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

                    {/*This button currently doesn't change anything in the backend*/}
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        setFavorited(!favorited)
                    }}>
                        {favorited ?
                            <StarIcon sx={{color: theme.palette.primary.dark}}/>
                            :
                            <StarOutlineIcon sx={{color: theme.palette.primary.dark}}/>
                        }
                    </IconButton>
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
        <Stack flexDirection={"row"} flexWrap="wrap" height={"75%"}>
            {games.map(game => <GameCard game={game} key={game.id}/>)}
        </Stack>
    )
}