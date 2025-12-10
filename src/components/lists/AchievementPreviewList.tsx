import {Stack} from "@mui/material";
import type {Achievement} from "../../models/achievement/Achievement.ts";
import {AchievementPreviewCard} from "../cards/AchievementPreviewCard.tsx";

interface AchievementPreviewListProps {
    achievements: Achievement[];
    amountToShow?: number;
}

export function AchievementPreviewList({achievements, amountToShow = 3}: AchievementPreviewListProps) {
    return (
        <Stack
            direction={"row"}
            sx={{
                width: "100%",
                minHeight: 100,
                mt:2
            }}
            gap={2}
        >
            {achievements.slice(0, amountToShow).map((achievement) =>
                <AchievementPreviewCard
                    name={achievement.name}
                    description={achievement.description}
                    unlocked={achievement.id==="222"? true: false}
                />
            )}
        </Stack>
    )
}