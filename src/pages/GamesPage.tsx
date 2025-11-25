import {CircularProgress, Typography, Container, Stack, Button} from "@mui/material";
import {GameCardList} from "../components/GameCard.tsx";
import {useGamesList} from "../hooks/useGamesList.tsx";
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper, StyledInputBase, Search} from "../components/Search.tsx";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useEffect, useState} from "react";
import type {CompactGame} from "../models/Game.ts";

export function GamesPage() {
    const {isLoading: isLoadingGamesList, isError: isErrorGamesList, games} = useGamesList()
    const [sortAbc, setSortAbc] = useState(true)
    const [sortedGames, setSortedGames] = useState<CompactGame[]>();
    const [searchTerm, setSearchTerm] = useState("");

    function filterGames(searchString: string, sortAbcBool: boolean) {
        setSearchTerm(searchString);
        setSortAbc(sortAbcBool)

        let list: CompactGame[] = games ?? [];

        if (searchString) {
            list = list.filter(g =>
                g.name.toLowerCase().includes(searchString.toLowerCase())
            );
        }

        console.log("we gaan da hier is sorteren")
        list = [...list].sort((g1, g2) =>
            sortAbcBool
                ? g1.name.localeCompare(g2.name)
                : g2.name.localeCompare(g1.name)
        );
        //console.log(list)

        setSortedGames(list);
    }

    useEffect(() => {
        setSortedGames(games)
    }, [games]);


    if (isLoadingGamesList) {
        return <CircularProgress/>
    }

    if (isErrorGamesList || !games || !sortedGames) {
        return <div>Something went Wrong! <SentimentDissatisfied/></div>
    }

    return (
        <>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant={"h2"}>
                    Games
                </Typography>
                <Stack direction={"row"}>
                    <Button onClick={() => {
                        filterGames(searchTerm, !sortAbc)
                    }}>
                        <Stack direction={"row"}>
                            <Typography>abc</Typography>
                            {sortAbc ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                        </Stack>
                    </Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            value={searchTerm}
                            onChange={(e) => {
                                filterGames(e.target.value, sortAbc)
                            }}
                        />
                    </Search>
                </Stack>
            </Stack>
            {sortedGames.length != 0 ?
                <GameCardList games={sortedGames}/>
                :
                <Container>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <VideogameAssetOffIcon/>
                        <Typography color={"info"}>Geen games gevonden</Typography>
                    </Stack>
                </Container>
            }
        </>
    )
}