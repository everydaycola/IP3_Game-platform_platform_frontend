import { Stack, Typography} from "@mui/material";
import {GameFullAchievementList} from "../components/GameFullAchievementList.tsx";

export function AchievementPage() {

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
            </Stack>

            <GameFullAchievementList gameName={"Go"}/>
            <GameFullAchievementList gameName={"Tic Tac Toe"}/>
            <GameFullAchievementList gameName={"Tetris"}/>

        </Stack>
    )
}