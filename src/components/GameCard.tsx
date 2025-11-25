import type {CompactGame} from "../models/Game.ts";
import {Card, CardContent, CardActionArea, CardMedia, Typography, Stack, IconButton} from "@mui/material"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react";

interface GameCardProps {
    game: CompactGame
}

export function GameCard({game}: GameCardProps) {
    const [favorited, setFavorited] = useState(false)
    return (
        <Card sx={{width: {lg: "20%", xs: "40%"}, height:"40%", marginRight: "5%", marginBottom: "5%"}}>
            <CardActionArea /*onClick={get sent to the game page}*/ sx={{height: "75%"}}>
                {game.icon == "" ?
                    <Stack alignItems={"center"} sx={{marginY: "1rem"}}>
                        <VideogameAssetIcon/>
                    </Stack>
                    :
                    <CardMedia component="img" sx={{padding: "5%", height:"inherit", width:"auto",marginX:"auto"}} image={game.icon}/>
                }
            </CardActionArea>
            <CardContent sx={{height: "25%", boxShadow:"5"}}>
                <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography>{game.name}</Typography>

                    {/*This button currently doesn't change anything in the backend*/}
                    <IconButton onClick={() => setFavorited(!favorited)}>
                        {favorited ?
                            <StarIcon/>
                            :
                            <StarOutlineIcon/>
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