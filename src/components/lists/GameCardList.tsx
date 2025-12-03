import type {CompactGame} from "../../models/Game.ts";
import {Stack} from "@mui/material";
import {GameCard} from "../cards/GameCard.tsx";

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