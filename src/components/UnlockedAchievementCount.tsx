import {Typography, Stack} from "@mui/material";

interface UnlockedAchievementCountProps {
    unlockedCount: number;
    totalCount: number;
}

export function UnlockedAchievementCount({unlockedCount, totalCount}: UnlockedAchievementCountProps) {
    return (
        <Stack
            direction={"column"}
        >
            <Typography>{unlockedCount/totalCount}%</Typography>
            <Typography>
                {unlockedCount}/{totalCount}
            </Typography>
        </Stack>
    )
}