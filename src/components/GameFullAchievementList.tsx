import { IconButton, Stack, Typography} from "@mui/material";
import {AchievementPreviewList} from "./lists/AchievementPreviewList.tsx";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import type {Achievement} from "../models/achievement/Achievement.ts";
import {usePlatformUser} from "../hooks/usePlatformUser.tsx";
import {UnlockedAchievementCount} from "./UnlockedAchievementCount.tsx";

interface GameFullAchievementListProps{
    gameName:string;
    filter: "all"|"achieved"|"not-achieved"
    achievements: Achievement[];
    openedByDefault?:boolean;
}

export function GameFullAchievementList({gameName,filter, achievements, openedByDefault = false}:GameFullAchievementListProps){
    const [isExpanded, setIsExpanded] = useState(openedByDefault);
    const {platformUser} = usePlatformUser();

    const unlockedCount = achievements.filter(a =>
        platformUser.achievements.some(u => u.achievementId === a.id)
    ).length;

    return(
        <Stack direction={"column"}>
            <Stack direction={"row"} alignItems={"center"}>
                <Typography variant={"h4"}
                            sx={{mt: 4}}>
                    {gameName}
                </Typography>
                <IconButton

                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded?
                    <ExpandLessIcon/>
                        :
                    <ExpandMoreIcon/>
                    }
                </IconButton>
            </Stack>
            <UnlockedAchievementCount unlockedCount={unlockedCount} totalCount={achievements.length}/>

            <AchievementPreviewList
                achievements={achievements}
                filter={filter}
                amountToShow={isExpanded ? achievements.length : 0}
            />

        </Stack>
    )
}