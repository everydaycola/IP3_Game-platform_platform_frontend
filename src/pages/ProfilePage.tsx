import {Avatar, Box, Button, Card, CardContent, Paper, Typography, useTheme} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";

export function ProfilePage() {
    const theme = useTheme();
    const {userName} = useParams();
    const {loggedInUser} = useContext(SecurityContext);

    return (
        <Card sx={{maxWidth: "100%", mx: 'auto', mt: 5, borderRadius: 3, overflow: 'hidden'}}>
            <Box
                component="div"
                sx={{
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuq3joaHJkCS8gftpCUUR3Yg63O6kFWSO7fg&s)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    minHeight: 180,
                    height: 180,
                    position: "relative"
                }}
            >
                {loggedInUser?.username === userName &&
                    <Button
                        data-testid="preference-edit-button"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8
                        }}
                        variant={"contained"}
                        component={Link}
                        to={"/userPreferences"}
                    >
                        Voorkeuren wijzigen
                    </Button>
                }
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: -8}}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        border: '3px solid white',
                        color: theme.palette.primary.contrastText
                    }}
                />
            </Box>

            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h4"
                            color={theme.palette.primary.main}>
                    {userName}
                </Typography>

                <Paper
                    sx={{
                        display: 'flex',
                        width: '100%',
                        minHeight: 250,
                        overflow: 'hidden',
                        mt: 4,
                        color: theme.palette.primary.main
                    }}
                >
                    <Box
                        sx={{
                            width: '75%',
                            p: 2,
                            textAlign: "left"
                        }}
                    >
                        <Typography>
                            Placeholder voor de biografie van een gebruiker.
                        </Typography>
                    </Box>

                    {loggedInUser?.username === userName &&
                        <Box
                            sx={{
                                width: '25%',
                                p: 2,
                                textAlign: "right"
                            }}
                        >
                            <Button
                                data-testid="friend-view-button"
                                variant="contained"
                                sx={{mt: 1}}
                                component={Link}
                                to={"/friends"}
                            >
                                Vrienden
                            </Button>
                        </Box>
                    }
                </Paper>
            </CardContent>
        </Card>

    )
}