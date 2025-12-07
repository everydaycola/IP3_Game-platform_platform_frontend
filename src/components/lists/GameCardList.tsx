import type {CompactGame} from "../../models/Game.ts";
import {Stack} from "@mui/material";
import {GameCard} from "../cards/GameCard.tsx";
import type {FavoriteGame} from "../../models/FavoriteGame.ts";

interface GameCardListProps {
    games: CompactGame[];
    favorites: FavoriteGame[];
}

export function GameCardList({games,favorites}: GameCardListProps) {
    return (
        <Stack direction={"row"} flexWrap="wrap" height={"75%"} sx={{pt:2}}>
            {games.map(game => <GameCard game={game} key={game.id} isFavorite={favorites.some(fav => fav.gameId === game.id)}/>)}
        </Stack>
    )
}