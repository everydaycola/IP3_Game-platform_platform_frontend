import {Card, CardActions, CardContent, IconButton} from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {useEffect, useState} from "react";
import {useCheckGameReachable} from "../hooks/useCheckGameReachable.tsx";

interface GamePlayerProps{
    gameUrl: string;
}

export function GamePlayer({gameUrl}:GamePlayerProps){
    const {isReachable} = useCheckGameReachable(gameUrl);
    const [isFullScreen, setIsFullScreen] = useState(false);

    function handleEscapePress(){
        setIsFullScreen(false);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscapePress);

        return() => {
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, []);

    if(!isReachable){
        throw new Error(gameUrl + "is not reachable...");
    }

    return(
        <>
            <Card
                sx={{
                    mt:2,
                    maxHeight:isFullScreen ? "auto":"75svh",
                    aspectRatio: isFullScreen?  "auto" : "16/9",
                    display:"flex",
                    flexDirection:"column",
                    overflow:"hidden",
                    position:isFullScreen?"absolute":"relative",
                    top:isFullScreen? 0: "auto",
                    left:isFullScreen? 0: "auto",
                    right:isFullScreen? 0: "auto",
                    bottom:isFullScreen? 0: "auto",
                    boxShadow: "inset 0 0 16px rgba(0,0,0,0.4)"
                }}
            >
                <CardContent
                    sx={{
                        flexGrow: 1,
                        p: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    <iframe
                        width={"100%"}
                        height={"100%"}
                        src={gameUrl}
                    />
                </CardContent>
                <CardActions
                    sx={{
                        height: 40,
                        minHeight: 40,
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "flex-end",
                        px: 1,
                    }}
                >
                    <IconButton
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        sx={{color:"white"}}
                    >
                        {isFullScreen ?
                            <FullscreenExitIcon/>
                            :
                            <FullscreenIcon/>
                        }
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}