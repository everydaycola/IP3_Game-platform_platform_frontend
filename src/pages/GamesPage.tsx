import {CircularProgress, Typography, Container, Stack, Button} from "@mui/material";
import {GameCardList} from "../components/GameCard.tsx";
import {useGamesList} from "../hooks/useGamesList.tsx";
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper, StyledInputBase, Search} from "../components/Search.tsx";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {type ChangeEvent, useEffect, useState} from "react";
import type {CompactGame} from "../models/Game.ts";

export function GamesPage() {
    const {isLoading: isLoadingGamesList, isError: isErrorGamesList, games} = useGamesList()
    const [sortAbc, setSortAbc] = useState<boolean>()
    const [sortedGames, setSortedGames] = useState<CompactGame[]>();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let list:CompactGame[] = games?? [];

        if (searchTerm) {
            list = list.filter(g =>
                g.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        list.sort((g1, g2) =>
            sortAbc
                ? g1.name.localeCompare(g2.name)
                : g2.name.localeCompare(g1.name)
        );

        setSortedGames(list);
    }, [games, searchTerm, sortAbc]);


    if (isLoadingGamesList) {
        return <CircularProgress/>
    }

    if (isErrorGamesList || !games || !sortedGames) {
        return <div>Something went Wrong! <SentimentDissatisfied/></div>
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant={"h2"}>
                    Games
                </Typography>
                <Stack>
                    <Button onClick={() => setSortAbc(!sortAbc)}>
                        <Stack flexDirection={"row"}>
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
                            onChange={handleSearchChange}
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