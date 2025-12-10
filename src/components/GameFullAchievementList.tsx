import { IconButton, Stack, Typography} from "@mui/material";
import {AchievementPreviewList} from "./lists/AchievementPreviewList.tsx";
import {achievementList} from "../models/achievement/TEST_ACHIEVEMENT_DATA.ts";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";

interface GameFullAchievementListProps{
    gameName:string;
}

export function GameFullAchievementList({gameName}:GameFullAchievementListProps){
    const [isExpanded, setIsExpanded] = useState(false);

    const bigList = [
        ...achievementList,
        ...achievementList,
        ...achievementList
    ];
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

            <AchievementPreviewList
                achievements={bigList}
                amountToShow={isExpanded ? bigList.length : 0}
            />

        </Stack>
    )
}