import {Stack, Typography} from "@mui/material";
import {GameFullAchievementList} from "../components/GameFullAchievementList.tsx";
import {useGamesList} from "../hooks/api/games/useGamesList.tsx";

export function AchievementPage() {
    const {games} = useGamesList();

    return (
        <Stack direction={{sx: "column"}}
        >
            <Stack direction={"column"}>
                <Typography variant={"h2"}>
                    Achievements
                </Typography>
                <Typography>
                    After we implement a 'purchase system' users will only see achievements for games they own.
                </Typography>
            </Stack>
            {games.map((game) =>
                    game.achievements.length !== 0 && (
                        <GameFullAchievementList
                            key={"game" + game.id}
                            openedByDefault={true}
                            gameName={game.name}
                            achievements={game.achievements}
                        />
                    )
            )}
        </Stack>
    )
}