import {Button,  Divider, Stack, TextField, Typography, useTheme} from "@mui/material";
import {useFriendRecommendations} from "../../hooks/api/friends/useFriendRecommendations.tsx";
import NewFriendCard from "../cards/NewFriendCard.tsx";
import {type FormEvent,  useState} from "react";



export function FriendRecommendationList() {
    const theme = useTheme();
    const [currentSearch, setCurrentSearch] = useState("");
    const [queryString, setQueryString] = useState("");
    const {recommendations} = useFriendRecommendations(queryString);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQueryString(currentSearch);
    };

    return (
        <>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
                Zoek vrienden
            </Typography>

            <form onSubmit={handleFormSubmit}>
                <Stack direction="column" spacing={2} sx={{ m: 2 }}>
                    <TextField
                        label="Gebruikersnaam"
                        variant="outlined"
                        fullWidth
                        value={currentSearch}
                        sx={{
                            '& .MuiOutlinedInput-input': {
                                color: theme.palette.primary.main,
                            }
                        }}
                        onChange={(e) => setCurrentSearch(e.target.value)}
                    />
                    <Button type="submit" variant="contained">
                        Zoeken
                    </Button>
                </Stack>
            </form>

            <Divider
                orientation="horizontal"
                flexItem
                sx={{
                    my: 2,
                    borderColor: theme.palette.primary.main,
                    height: 2
                }}
            />
            {recommendations.recommendations?.map((recomendation) =>
                <NewFriendCard key={recomendation.userName} userName={recomendation.userName}/>
            )}
        </>
    )
}