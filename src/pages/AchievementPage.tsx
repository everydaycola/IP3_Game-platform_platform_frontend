import {Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {GameFullAchievementList} from "../components/GameFullAchievementList.tsx";
import {useGamesList} from "../hooks/api/games/useGamesList.tsx";
import { useState } from "react";

export function AchievementPage() {
    const [filter, setFilter] = useState<"all"|"achieved"|"not-achieved">("all");
    const {games} = useGamesList();

    return (
        <Stack direction={{sx: "column"}}
        >
            <Stack direction={"column"}>
                <Typography variant={"h2"}>
                    Achievements
                </Typography>
                <Typography>
                    After we implement a 'purhcase system' users will only see achievements for games they own.
                </Typography>
                <Typography variant={"h6"}  sx={{mt:2}}>
                    Filter:
                </Typography>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={(_, newValue) => newValue && setFilter(newValue)}
                    size="small"
                >
                    <ToggleButton value="all">Alles</ToggleButton>
                    <ToggleButton value="achieved">Behaald</ToggleButton>
                    <ToggleButton value="not-achieved">Niet behaald</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {games.map((game,idx) =>
                    game.achievements.length !== 0 && (
                        <GameFullAchievementList
                            key={"game" + game.id}
                            filter={filter}
                            openedByDefault={idx === 0}
                            gameName={game.name}
                            achievements={game.achievements}
                        />
                    )
            )}
        </Stack>
    )
}